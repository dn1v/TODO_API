import { TaskController } from "../controllers/task";
import { AuthUtils } from "../middlewares/auth";
import { RouterConfig } from "../interfaces/routerConfig.interface";
import { RequestMethod } from "../constants/requestMethods.";
import { Endpoints } from "../constants/endpoints";

const task = new TaskController()

export const routersArr: RouterConfig[] = [
      { path: Endpoints.TASKS, handlers: [AuthUtils.authUser, task.createTask], method: RequestMethod.POST },
      { path: Endpoints.TASKS, handlers: [AuthUtils.authUser, task.readTasks], method: RequestMethod.GET },
      { path: Endpoints.TASKS_ID, handlers: [AuthUtils.authUser, task.readTask], method: RequestMethod.GET },
      { path: Endpoints.TASKS_ID, handlers: [AuthUtils.authUser, task.editTask], method: RequestMethod.PATCH },
      { path: Endpoints.TASKS_ID, handlers: [AuthUtils.authUser, task.deleteTask], method: RequestMethod.DELETE }
]