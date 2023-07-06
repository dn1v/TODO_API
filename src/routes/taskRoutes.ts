import { TaskController } from "../controllers/task";
import { authUser } from "../middlewares/auth";
import { RouterConfig } from "../interfaces/routerConfig.interface";
import { RequestMethod } from "../constants/requestMethods.";
import { Endpoints } from "../constants/endpoints";

const task = new TaskController()

export const routersArr: RouterConfig[] = [
      { path: Endpoints.TASKS, handlers: [authUser, task.createTask], method: RequestMethod.POST },
      { path: Endpoints.TASKS, handlers: [authUser, task.readTasks], method: RequestMethod.GET },
      { path: Endpoints.TASKS_ID, handlers: [authUser, task.readTask], method: RequestMethod.GET },
      { path: Endpoints.TASKS_ID, handlers: [authUser, task.editTask], method: RequestMethod.PATCH },
      { path: Endpoints.TASKS_ID, handlers: [authUser, task.deleteTask], method: RequestMethod.DELETE }
]