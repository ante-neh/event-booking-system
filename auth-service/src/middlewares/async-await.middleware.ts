import { NextFunction, Response, Request } from "express";

const asyncAwaitHandler = (fn: any)=>(req: Request, res: Response, next: NextFunction)=>{
    Promise.resolve(fn(req, res, next)).catch(next)
}

export { asyncAwaitHandler }