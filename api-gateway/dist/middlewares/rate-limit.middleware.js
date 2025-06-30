"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rateLimiter_util_1 = require("../utils/rateLimiter.util");
const logger_util_1 = require("../utils/logger.util");
const rateLimitMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const key = req.headers['x-api-key'] || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || req.ip;
    try {
        const rateLimitRes = yield rateLimiter_util_1.rateLimiter.consume(key);
        res.setHeader('X-RateLimit-Remaining', rateLimitRes.remainingPoints);
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimitRes.msBeforeNext).toISOString());
        next();
    }
    catch (rejRes) {
        res.setHeader('Retry-After', Math.ceil(rejRes.msBeforeNext / 1000));
        logger_util_1.logger.warn(`Rate limit exceeded for Ip: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many request'
        });
    }
});
exports.rateLimitMiddleware = rateLimitMiddleware;
