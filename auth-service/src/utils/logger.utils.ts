import winston from 'winston';
import { config } from '../config/env';

const logger = winston.createLogger({
    level: config.NODE_ENV === 'production' ? 'info':'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize(),
        winston.format.splat(),
    ),
    defaultMeta: { service: 'auth-service'},
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename: 'errors.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ],
});

export { logger }