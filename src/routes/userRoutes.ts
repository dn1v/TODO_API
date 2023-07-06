import { UserController } from "../controllers/user";
import { AuthUtils } from "../middlewares/auth";
import { Endpoints } from "../constants/endpoints";
import { RequestMethod } from "../constants/requestMethods.";
import { RouterConfig } from "../interfaces/routerConfig.interface";

const user = new UserController()

export const routersArr: RouterConfig[] = [
      { path: Endpoints.USERS, handlers: [user.createUser], method: RequestMethod.POST },
      { path: Endpoints.USERS_LOGIN, handlers: [user.login], method: RequestMethod.POST },
      { path: Endpoints.USERS_ME, handlers: [AuthUtils.authUser, user.getUsers], method: RequestMethod.GET },
      { path: Endpoints.USERS_ID, handlers: [user.getUser], method: RequestMethod.GET },
      { path: Endpoints.USERS_ME, handlers: [AuthUtils.authUser, user.editUsers], method: RequestMethod.PATCH },
      { path: Endpoints.USERS_LOGOUT, handlers: [AuthUtils.authUser, user.logout], method: RequestMethod.PATCH },
      { path: Endpoints.USERS_LOGOUTALL, handlers: [AuthUtils.authUser, user.logoutAll], method: RequestMethod.PATCH },
      { path: Endpoints.USERS_ME, handlers: [AuthUtils.authUser, user.deleteUser], method: RequestMethod.DELETE },
]