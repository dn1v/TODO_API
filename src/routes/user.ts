import { Router } from "express";
import { createUser, deleteUser, editUsers, getUser, getUsers, login, logout, logoutAll } from "../controllers/user";
import { authUser } from "../middlewares/auth";

export const userRouter: Router = Router()

userRouter.post('/users', createUser)
      .post('/users/login', login)
      .get('/users/me', authUser, getUsers)
      .get('/users/:id', getUser)
      .patch('/users/me', authUser, editUsers)
      .patch('/users/logout', authUser, logout)
      .patch('/users/logoutall', authUser, logoutAll)
      .delete('/users/:id', deleteUser)

