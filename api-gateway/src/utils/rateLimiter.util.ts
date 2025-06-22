import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "../config/redis";

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 100,
    duration: 60,
})

export { rateLimiter }