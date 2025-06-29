"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_util_1 = require("../utils/logger.util");
const types_1 = require("../types");
const errorMiddleware = (err, req, res, next) => {
    let message = 'Internal server error';
    let statusCode = 500;
    if (err instanceof types_1.BadRequestError) {
        message = err.message || 'Bad request';
        statusCode = 400;
    }
    if (err instanceof types_1.NotFoundError) {
        message = err.message || 'Not found';
        statusCode = 404;
    }
    if (err instanceof types_1.UnauthorizedError) {
        message = err.message || 'Unauthorized';
        statusCode = 401;
    }
    if (err instanceof types_1.ForbiddenError) {
        message = err.message || 'Forbidden';
        statusCode = 403;
    }
    logger_util_1.logger.warn('Error has occurred', {
        status: statusCode,
        message: message
    });
    res.json(statusCode).json({
        status: false,
        message: message,
    });
};
exports.errorMiddleware = errorMiddleware;
