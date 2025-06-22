import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.util';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '../types';

const errorMiddleware = (err: any, req: Request, res:Response, next: NextFunction)=>{
    let message = 'Internal server error'
    let statusCode = 500 

    if(err instanceof BadRequestError){
        message = err.message || 'Bad request';
        statusCode = 400;
    }

    if(err instanceof NotFoundError){
        message = err.message || 'Not found';
        statusCode = 404;
    }

    if(err instanceof UnauthorizedError){
        message = err.message || 'Unauthorized';
        statusCode = 401;
    }

    if(err instanceof ForbiddenError){
        message = err.message || 'Forbidden';
        statusCode = 403
    }

    logger.warn('Error has occurred', {
        status: statusCode,
        message: message
    })

    res.json(statusCode).json({
        status: false,
        message: message,
    })
};

export { errorMiddleware };