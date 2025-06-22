import dotenv from 'dotenv';
import path from 'path';
import { getEnv } from '../utils/env.util';

dotenv.config({ path: path.resolve(process.cwd(), '.env')});

const config = {
    PORT: getEnv('PORT'),
    JWT_SECRET: getEnv('JWT_SECRET'),
    NODE_ENV: getEnv("NODE_ENV"),
    REDIS_PORT: Number(getEnv('REDIS_PORT')),
    REDIS_HOST: getEnv("REDIS_HOST"),
    AUTH_SERVICE_URL: getEnv('AUTH_SERVICE_URL'),
    ADMIN_SERVICE_URL: getEnv('ADMIN_SERVICE_URL'),
    BOOKING_SERVICE_URL: getEnv('BOOKING_SERVICE_URL'),
    EVENT_SERVICE_URL: getEnv('EVENT_SERVICE_URL'),
    NOTIFICATION_SERVICE_URL: getEnv('NOTIFICATION_SERVICE_URL'),
    PAYMENT_SERVICE_URL: getEnv('PAYMENT_SERVICE_URL'),
    USER_SERVICE_URL: getEnv('USER_SERVICE_URL'),
}

export { config };