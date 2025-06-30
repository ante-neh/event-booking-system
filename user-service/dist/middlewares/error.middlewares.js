"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const env_1 = require("../config/env");
const errorMiddleware = (err, req, res, next) => {
    let message = 'Internal server error';
    let statusCode = 500;
    if (err instanceof types_1.BadRequestError) {
        message = err.message || 'Bad request';
        statusCode = 400;
    }
    if (err instanceof types_1.UnauthorizedError) {
        message = err.message || 'Unauthorized';
        statusCode = 401;
    }
    if (err instanceof types_1.ForbiddenError) {
        message = err.message || 'Forbidden';
        statusCode = 403;
    }
    if (err instanceof types_1.NotFoundError) {
        message = err.message || 'Not found';
        statusCode = 404;
    }
    logger_1.logger.error('Error has occurred', {
        message: err.message,
        status: statusCode,
        stack: env_1.config.NODE_ENV === 'production' ? undefined : err.stack,
        url: req.originalUrl,
        ip: req.ip
    });
    res.status(statusCode).json({
        status: false,
        message
    });
};
exports.errorMiddleware = errorMiddleware;
