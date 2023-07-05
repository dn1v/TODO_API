import prisma from "../db/database";
import { Request, Response } from "express";
import { filterAndSortParams } from "../helpers/queryParams";
import { pagination } from "../helpers/pagination";

export class TaskController {

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const task = await prisma.task.create({
                data: {
                    content: req.body.content,
                    done: req.body.done,
                    authorId: req.user?.id
                }
            })
            res.status(201).send({ task })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async readTasks(req: Request, res: Response): Promise<Response | void> {
        const { sort, where } = filterAndSortParams(req)
        const { take, skip } = pagination(req)
        try {
            const tasks = await prisma.task.findMany({
                where,
                orderBy: sort,
                skip,
                take
            })
            if (tasks.length === 0) return res.status(404).send()
            res.send({ tasks })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async readTask(req: Request, res: Response): Promise<Response | void> {
        try {
            const task = await prisma.task.findFirst({
                where: {
                    taskId: req.params.id,
                    authorId: req.user?.id
                }
            })
            if (!task) return res.status(404).send()
            res.send(task)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async editTask(req: Request, res: Response): Promise<Response | void> {
        const updates: string[] = Object.keys(req.body)
        const allowedUpdates: string[] = ['done', 'content']
        const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update))
        if (!isAllowed) return res.status(400).send()
        try {
            const task = await prisma.task.updateMany({
                where: {
                    taskId: req.params.id,
                    authorId: req.user?.id
                },
                data: {
                    ...req.body
                }
            })
            if (task.count === 0) return res.status(404).send()
            res.send(task)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async deleteTask(req: Request, res: Response): Promise<Response | void> {
        try {
            const task = await prisma.task.deleteMany({
                where: {
                    taskId: req.params.id,
                    authorId: req.user?.id
                }
            })
            console.log(task)
            // ne radi... ne znam zašto
            if (!task) return res.status(404).send()
            res.send(task)
        } catch (e) {
            res.status(500).send()
        }
    }
    
}
