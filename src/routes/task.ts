import { Router } from "express";
import { createTask, deleteTask, editTask, readTask, readTasks } from "../controllers/task";
import { authUser } from "../middlewares/auth";
import { RouterInfo } from "../interfaces/routerInfo.interface";
import { RequestMethod } from "../constants/requestMethods.";
import { AppRouters } from "./appRouter";

// const routersArr: RouterInfo[] = [
//       { path: '/tasks', handlers: [authUser, createTask], method: RequestMethod.POST },
//       { path: '/tasks', handlers: [authUser, readTasks], method: RequestMethod.GET },
//       { path: '/tasks/:id', handlers: [authUser, readTask], method: RequestMethod.GET },
//       { path: '/tasks/:id', handlers: [authUser, editTask], method: RequestMethod.PATCH },
//       { path: '/tasks/:id', handlers: [authUser, deleteTask], method: RequestMethod.DELETE }
// ]


// export const taskRouter = new AppRouters(routersArr)

const taskRouter: Router = Router()

taskRouter.post('/tasks', authUser, createTask)
      .get('/tasks', authUser, readTasks)
      .get('/tasks/:id', authUser, readTask)
      .patch('/tasks/:id', authUser, editTask)
      .delete('/tasks/:id', authUser, deleteTask)
//router.post('/task')

export default taskRouter