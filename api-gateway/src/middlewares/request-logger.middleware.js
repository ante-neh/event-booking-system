"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_util_1 = require("../utils/logger.util");
const requestLogger = (req, res, next) => {
    logger_util_1.logger.info(`Received ${req.method} request to ${req.url}`, { body: req.body });
    next();
};
exports.requestLogger = requestLogger;
