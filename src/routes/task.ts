import { Router } from "express";
import { createTask, deleteTask, editTask, readTask, readTasks } from "../controllers/task";
import { authUser } from "../middlewares/auth";



export const taskRouter: Router = Router()

taskRouter.post('/tasks', authUser, createTask)
      .get('/tasks', authUser, readTasks)
      .get('/tasks/:id', authUser, readTask)
      .patch('/tasks/:id', authUser, editTask)
      .delete('/tasks/:id', authUser, deleteTask)
//router.post('/task')

export default taskRouter