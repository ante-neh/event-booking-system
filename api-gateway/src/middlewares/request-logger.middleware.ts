import { NextFunction, Request, Response } from "express";
import { logger } from '../utils/logger.util'

const requestLogger = (req: Request, res: Response, next: NextFunction)=>{
    logger.info(`Received ${req.method} request to ${req.url}`, { body: req.body })
    next();
}

export { requestLogger }