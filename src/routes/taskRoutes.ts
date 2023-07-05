import { TaskController } from "../controllers/task";
import { authUser } from "../middlewares/auth";
import { RouterConfig } from "../interfaces/routerConfig.interface";
import { RequestMethod } from "../constants/requestMethods.";

const task = new TaskController()

export const routersArr: RouterConfig[] = [
      { path: '/tasks', handlers: [authUser, task.createTask], method: RequestMethod.POST },
      { path: '/tasks', handlers: [authUser, task.readTasks], method: RequestMethod.GET },
      { path: '/tasks/:id', handlers: [authUser, task.readTask], method: RequestMethod.GET },
      { path: '/tasks/:id', handlers: [authUser, task.editTask], method: RequestMethod.PATCH },
      { path: '/tasks/:id', handlers: [authUser, task.deleteTask], method: RequestMethod.DELETE }
]