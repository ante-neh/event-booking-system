"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const redis_1 = require("../config/redis");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redis_1.redisClient,
    keyPrefix: 'middleware',
    points: 100,
    duration: 60,
});
exports.rateLimiter = rateLimiter;
