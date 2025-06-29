"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const redisClient = new ioredis_1.default({
    host: env_1.config.REDIS_HOST,
    port: env_1.config.REDIS_PORT,
    enableOfflineQueue: false,
});
exports.redisClient = redisClient;
