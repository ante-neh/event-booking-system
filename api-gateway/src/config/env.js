"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env_util_1 = require("../utils/env.util");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const config = {
    PORT: (0, env_util_1.getEnv)('PORT'),
    JWT_SECRET: (0, env_util_1.getEnv)('JWT_SECRET'),
    NODE_ENV: (0, env_util_1.getEnv)("NODE_ENV"),
    REDIS_PORT: Number((0, env_util_1.getEnv)('REDIS_PORT')),
    REDIS_HOST: (0, env_util_1.getEnv)("REDIS_HOST"),
    AUTH_SERVICE_URL: (0, env_util_1.getEnv)('AUTH_SERVICE_URL'),
    ADMIN_SERVICE_URL: (0, env_util_1.getEnv)('ADMIN_SERVICE_URL'),
    BOOKING_SERVICE_URL: (0, env_util_1.getEnv)('BOOKING_SERVICE_URL'),
    EVENT_SERVICE_URL: (0, env_util_1.getEnv)('EVENT_SERVICE_URL'),
    NOTIFICATION_SERVICE_URL: (0, env_util_1.getEnv)('NOTIFICATION_SERVICE_URL'),
    PAYMENT_SERVICE_URL: (0, env_util_1.getEnv)('PAYMENT_SERVICE_URL'),
    USER_SERVICE_URL: (0, env_util_1.getEnv)('USER_SERVICE_URL'),
};
exports.config = config;
