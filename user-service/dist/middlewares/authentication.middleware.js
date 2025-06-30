"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const authenticate = (req, res, next) => {
    if (req.headers["x-user-id"]) {
        req.user = req.user || {};
        const id = req.headers["x-user-id"];
        const role = req.headers["x-user-role"];
        if (!id || !role) {
            logger_1.logger.warn("Unauthenticated request", {
                method: req.method,
                url: req.originalUrl,
            });
            return next(new types_1.BadRequestError("unauthenticated"));
        }
        req.user.id = id;
        if (role)
            req.user.role = role;
        next();
    }
    else {
        logger_1.logger.warn("Unauthenticated request", {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
        });
        next(new types_1.BadRequestError("unauthenticated"));
    }
};
exports.authenticate = authenticate;
