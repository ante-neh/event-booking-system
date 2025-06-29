"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const logger_utils_1 = require("../utils/logger.utils");
const validationMiddleware = (schema, validationType) => (req, res, next) => {
    try {
        const result = schema.safeParse(req[validationType]);
        if (!result.success) {
            const errors = result.error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({
                success: false,
                message: "Validation faild",
                errors,
            });
        }
        req[validationType] = result.data;
        next();
    }
    catch (error) {
        logger_utils_1.logger.error("Validation faild", {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            message: error.message,
        });
        next(error);
    }
};
exports.validationMiddleware = validationMiddleware;
