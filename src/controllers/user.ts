import prisma from "../db/database";
import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { generateToken, hashPassword, validateUser } from "../middlewares/auth";

export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
    const data: User = {
        ...req.body
    }
    data.password = await hashPassword(data.password)
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

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userToValidate = await validateUser(req.body.email, req.body.password)
        if (!userToValidate) return res.status(400).send({ error: "Either email or password incorrect." });
        const { user, token } = userToValidate

        res.send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const logout = async (req: Request, res: Response): Promise<Response | void> => {
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

export const logoutAll = async (req: Request, res: Response): Promise<Response | void> => {
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

export const getUsers = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        if (!req.user) return res.status(404).send()
        res.send({ user: req.user, token: req.token })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response | void> => {
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

export const editUsers = async (req: Request, res: Response): Promise<Response | void> => {
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['firstName', 'lastName', 'password', 'email']
    const isAllowed = updates.every((update: string) => allowedUpdates.includes(update))
    if (!isAllowed) return res.status(400).send()
    try {
        if (!req.user) return res.status(404).send()
        if (req.body.password) {
            const hashedPassword = await hashPassword(req.body.password)
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

export const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
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