import { NextFunction, Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "../types";
import { logger } from "../utils/logger";
import { config } from "../config/env";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) =>{
    let message = 'Internal server error';
    let statusCode = 500;

    if(err instanceof BadRequestError){
        message = err.message || 'Bad request';
        statusCode = 400;
    }

    if(err instanceof UnauthorizedError){
        message = err.message || 'Unauthorized';
        statusCode = 401;
    }

    if(err instanceof ForbiddenError){
        message = err.message || 'Forbidden';
        statusCode = 403;
    }

    if(err instanceof NotFoundError){
        message = err.message || 'Not found';
        statusCode = 404
    }

    logger.error('Error has occurred', {
        message: err.message,
        status: statusCode,
        stack: config.NODE_ENV === 'production' ? undefined : err.stack,
        url: req.originalUrl,
        ip: req.ip
    })

    res.status(statusCode).json({
        status: false,
        message
    })
}

export { errorMiddleware }