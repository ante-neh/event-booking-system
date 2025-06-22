import { NextFunction, Request, Response } from 'express'; 
import { verify } from 'jsonwebtoken';
import { config } from '../config/env';
import { logger } from '../utils/logger.util'

const authMiddleware = (req: Request, res: Response, next: NextFunction): void=>{
    const token = req.headers.authorization?.split(" ")[1] as string;
    if(!token){
        logger.warn('No token provided in request headers');
        res.status(401).json({ succuss: 'error', message: 'No token provided' });
        return;
    }

    verify(token, config.JWT_SECRET, (err, decoded)=> {
        if(err){
            logger.error('Token verification failed', { error: err.message });
            res.status(401).json({ success: 'error', message: 'Invalid token' });
            return;
        }

        req.user = decoded as {id: string, email: string, role:string };
        next();
    })
}

export { authMiddleware };