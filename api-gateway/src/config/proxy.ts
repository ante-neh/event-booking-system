import { NextFunction, Response } from "express"
import { logger } from "../utils/logger.util"

const proxyOptions = {
    proxyErrorHandler: (err: any, res: Response, next: NextFunction)=>{
        logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        })
    }
}

export { proxyOptions }