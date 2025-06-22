import { NextFunction, Request, Response } from 'express';
import { rateLimiter } from '../utils/rateLimiter.util';
import { logger } from '../utils/logger.util';


const rateLimitMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    const key = req.headers['x-api-key'] as string || req.ip as string;
    try {
        const rateLimitRes = await rateLimiter.consume(key);
        res.setHeader('X-RateLimit-Remaining', rateLimitRes.remainingPoints);
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimitRes.msBeforeNext).toISOString())
        next();
    } catch (rejRes: any) {
        res.setHeader('Retry-After', Math.ceil(rejRes.msBeforeNext / 1000));
        logger.warn(`Rate limit exceeded for Ip: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many request'
        });
    }
}

export { rateLimitMiddleware };