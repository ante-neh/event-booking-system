import Redis from 'ioredis'
import { config } from './env'

const redisClient = new Redis({
    host:config.REDIS_HOST,
    port:config.REDIS_PORT,
    enableOfflineQueue: false,
})

export { redisClient }