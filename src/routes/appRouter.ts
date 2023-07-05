import { Router } from "express";
import { RouterConfig } from "../interfaces/routerConfig.interface";
import { RequestMethod } from "../constants/requestMethods.";

export class AppRouters {
      public routers: RouterConfig[]
      private router: Router

      constructor(routers: RouterConfig[]) {
            this.routers = routers
            this.router = Router()

      }
      // it's longer and ugly with switch-case
      private createRouter(router: RouterConfig): void {
            if (router.method === RequestMethod.POST) this.router.post(router.path, ...router.handlers)
            if (router.method === RequestMethod.GET) this.router.get(router.path, ...router.handlers)
            if (router.method === RequestMethod.PUT) this.router.put(router.path, ...router.handlers)
            if (router.method === RequestMethod.PATCH) this.router.patch(router.path, ...router.handlers)
            if (router.method === RequestMethod.DELETE) this.router.delete(router.path, ...router.handlers)
      }

      public registerRoutes(): Router {
            this.routers.forEach((router: RouterConfig) => this.createRouter(router))
            return this.router
      }
}
