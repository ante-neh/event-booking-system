"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const logger_1 = require("../utils/logger");
const validationMiddleware = (schema, validationType) => (req, res, next) => {
    try {
        const result = schema.safeParse(req[validationType]);
        if (!result.success) {
            const errors = result.error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({
                status: false,
                message: "Validation faild",
                errors,
            });
        }
        req[validationType] = result;
        next();
    }
    catch (error) {
        logger_1.logger.error("validation error", {
            message: error.message,
            status: 400,
            method: req.method,
            validationType,
            url: req.url,
        });
        next(error);
    }
};
exports.validationMiddleware = validationMiddleware;
