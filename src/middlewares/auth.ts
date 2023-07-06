import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import prisma from '../db/database'
import { UserValidationReturn } from '../interfaces/userValidationReturn.interface'
import { Request, Response, NextFunction } from 'express'
import { DecodedToken } from '../interfaces/decodedToken.interface'
import { UserNonSensitiveData } from '../interfaces/noSensitiveData.interface'

export class AuthUtils {

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    static async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    static async validateUser(email: string, password: string): Promise<UserValidationReturn | undefined> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return
        const isValid = await this.comparePasswords(password, user.password)
        if (!isValid) return
        const token = await this.generateToken(user.id)
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                tokens: [...user.tokens, token]
            }
        })
        const withoutSensitveData: UserNonSensitiveData = new UserNonSensitiveData(updatedUser)
        return { user: withoutSensitveData, token }
    }

    static async generateToken(_id: string) {
        return await jwt.sign({ _id }, process.env.JWT_SECRET as Secret)
    }

    static async authUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '')
            console.log(token)
            if (token === undefined) throw new Error('Token not provided.')
            const decoded = await jwt.verify(token, process.env.JWT_SECRET as Secret) as DecodedToken
            if (!decoded) throw new Error('Invalid token.')
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded._id,
                }

            })
            if (!user?.tokens.includes(token)) throw new Error('Token is not valid anymore.')
            const withoutSensitveData: UserNonSensitiveData = new UserNonSensitiveData(user)
            req.user = user !== null ? withoutSensitveData : undefined
            req.token = token
            next()
        } catch (error) {
            if (error instanceof Error) return res.status(401).send({ error: error.message })
            res.status(500).send({ error: "An unknown error occurred." })
        }
    }
}