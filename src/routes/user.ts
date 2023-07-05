import { RequestHandler, Router } from "express";
import { createUser, deleteUser, editUsers, getUser, getUsers, login, logout, logoutAll } from "../controllers/user";
import { authUser } from "../middlewares/auth";
import { create } from "domain";
import { AppRouters } from "./appRouter";
import { RequestMethod } from "../constants/requestMethods.";
import { RouterInfo } from "../interfaces/routerInfo.interface";
//const handlers: RequestHandler[] = [createUser, deleteUser, editUsers, getUser, getUsers, login, logout, logoutAll]

const userRouter: Router = Router()
const routersArr: RouterInfo[] = [
      { path: '/users', handlers: [createUser], method: RequestMethod.POST },
      { path: '/users/login', handlers: [login], method: RequestMethod.POST },
      { path: '/users/me', handlers: [authUser, getUsers], method: RequestMethod.GET },
      { path: '/users/:id', handlers: [getUser], method: RequestMethod.GET },
      { path: '/users/me', handlers: [authUser, editUsers], method: RequestMethod.PATCH },
      { path: '/users/logout', handlers: [authUser, logout], method: RequestMethod.PATCH },
      { path: '/users/logoutall', handlers: [authUser, logoutAll], method: RequestMethod.PATCH },
      { path: '/users/:id', handlers: [deleteUser], method: RequestMethod.DELETE },
];
userRouter.post('/users', createUser)
      .post('/users/login', login)
      .get('/users/me', authUser, getUsers)
      .get('/users/:id', getUser)
      .patch('/users/me', authUser, editUsers)
      .patch('/users/logout', authUser, logout)
      .patch('/users/logoutall', authUser, logoutAll)
      .delete('/users/:id', deleteUser)

// class AppRouter {

// }

// export const userRouter = new AppRouters(routersArr)
export default userRouter