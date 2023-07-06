import prisma from "../db/database";
import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
//import { generateToken, hashPassword, validateUser } from "../middlewares/auth";
import { AuthUtils } from "../middlewares/auth";

export class UserController {

    async createUser(req: Request, res: Response): Promise<Response | void> {
        const data: User = {
            ...req.body
        }
        data.password = await AuthUtils.hashPassword(data.password)
        try {
            const checkUser = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })
            if (checkUser) return res.status(400).send({ error: "User with the provided email already exists." })
            const user = await prisma.user.create({ data })
            res.status(201).send({ user })
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async login(req: Request, res: Response): Promise<Response | void> {
        try {
            const userToValidate = await AuthUtils.validateUser(req.body.email, req.body.password)
            if (!userToValidate) return res.status(400).send({ error: "Either email or password incorrect." });
            const { user, token } = userToValidate
    
            res.send({ user, token })
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async logout(req: Request, res: Response): Promise<Response | void> {
        try {
            if (!req.user) return res.status(404).send()
            await prisma.user.update({
                where: {
                    id: req.user?.id
                },
                data: {
                    tokens: req.user?.tokens.filter((token: string) => req.token !== token)
                }
            })
            res.send({ message: 'Logged out.' })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async logoutAll(req: Request, res: Response): Promise<Response | void> {
        try {
            const user = await prisma.user.update({
                where: {
                    id: req.user?.id
                },
                data: {
                    tokens: []
                }
            })
            res.send({ user })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async getUsers(req: Request, res: Response): Promise<Response | void> {
        try {
            if (!req.user) return res.status(404).send()
            res.send({ user: req.user, token: req.token })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async getUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.params.id
                }
            })
            if (!user) return res.status(404).send()
            res.send({ user })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async editUsers(req: Request, res: Response): Promise<Response | void> {
        const updates: string[] = Object.keys(req.body)
        const allowedUpdates: string[] = ['firstName', 'lastName', 'password', 'email']
        const isAllowed = updates.every((update: string) => allowedUpdates.includes(update))
        if (!isAllowed) return res.status(400).send()
        try {
            if (!req.user) return res.status(404).send()
            if (req.body.password) {
                const hashedPassword = await AuthUtils.hashPassword(req.body.password)
                req.body.password = hashedPassword
            }
            const updatedUser = await prisma.user.update({
                where: {
                    id: req.user.id
                },
                data: {
                    ...req.body
                }
            })
            if (!updatedUser) return res.status(404).send()
            res.send(updatedUser)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async deleteUser(req: Request, res: Response): Promise<Response | void> {
        if (!req.params.id) return res.status(400).send({ error: 'User ID not provided.' })
        try {
            const user = await prisma.user.delete({
                where: {
                    id: req.params.id
                }
            })
            await prisma.task.deleteMany({
                where: {
                    authorId: req.user?.id
                }
            })
            if (!user) return res.status(404).send()
            res.send({ deletedUser: user })
        } catch (e) {
            res.status(404).send()
        }
    }
}