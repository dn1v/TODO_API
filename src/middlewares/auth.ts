import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import prisma from '../db/database'
import { UserValidationReturn } from '../interfaces/userValidationReturn.interface'
import { Request, Response, NextFunction } from 'express'
import { DecodedToken } from '../interfaces/decodedToken.interface'
import { env } from 'process'
export const hashPassword = async (password: string): Promise<string> => {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export const validateUser = async (email: string, password: string): Promise<UserValidationReturn | undefined> => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) return
    const isValid = await comparePasswords(password, user.password)
    if (!isValid) return
    const token = await generateToken(user.id)
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            tokens: [...user.tokens, token]
        }
    })
    return { user: updatedUser, token }
}

export const generateToken = async (_id: string) => {
    return await jwt.sign({ _id }, process.env.JWT_SECRET as Secret)
}


export const authUser = async (req: Request, res: Response, next: NextFunction) => {
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
        req.user = user !== null ? user : undefined
        req.token = token
        next()
    } catch (error) {
        if (error instanceof Error) return res.status(401).send({error: error.message}) 
        res.status(500).send({error: "An unknown error occurred."})
    }
}