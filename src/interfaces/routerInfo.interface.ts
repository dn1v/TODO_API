import { RequestHandler } from "express";

 export interface RouterInfo {
    path:string,
    handlers: RequestHandler[],
    method: string
 }