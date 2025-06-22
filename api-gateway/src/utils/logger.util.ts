import winston from 'winston';
import { config } from '../config/env';

const logger = winston.createLogger({
    level: config.NODE_ENV === 'production' ? 'info': 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat()
    ),
    defaultMeta: { service: 'api-gateway' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        }),
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

export { logger };