import { RequestHandler } from "express";

 export interface RouterConfig {
    path:string,
    handlers: RequestHandler[],
    method: string
 }