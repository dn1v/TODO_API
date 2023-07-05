import { UserController } from "../controllers/user";
import { authUser } from "../middlewares/auth";

import { RequestMethod } from "../constants/requestMethods.";
import { RouterConfig } from "../interfaces/routerConfig.interface";

const user = new UserController()

export const routersArr: RouterConfig[] = [
      { path: '/users', handlers: [user.createUser], method: RequestMethod.POST },
      { path: '/users/login', handlers: [user.login], method: RequestMethod.POST },
      { path: '/users/me', handlers: [authUser, user.getUsers], method: RequestMethod.GET },
      { path: '/users/:id', handlers: [user.getUser], method: RequestMethod.GET },
      { path: '/users/me', handlers: [authUser, user.editUsers], method: RequestMethod.PATCH },
      { path: '/users/logout', handlers: [authUser, user.logout], method: RequestMethod.PATCH },
      { path: '/users/logoutall', handlers: [authUser, user.logoutAll], method: RequestMethod.PATCH },
      { path: '/users/:id', handlers: [user.deleteUser], method: RequestMethod.DELETE },
]