"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
const logger_util_1 = require("../utils/logger.util");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        logger_util_1.logger.warn('No token provided in request headers');
        res.status(401).json({ succuss: 'error', message: 'No token provided' });
        return;
    }
    (0, jsonwebtoken_1.verify)(token, env_1.config.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger_util_1.logger.error('Token verification failed', { error: err.message });
            res.status(401).json({ success: 'error', message: 'Invalid token' });
            return;
        }
        req.user = decoded;
        next();
    });
};
exports.authMiddleware = authMiddleware;
