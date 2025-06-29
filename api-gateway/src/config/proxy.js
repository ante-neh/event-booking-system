"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyOptions = void 0;
const logger_util_1 = require("../utils/logger.util");
const proxyOptions = {
    proxyErrorHandler: (err, res, next) => {
        logger_util_1.logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};
exports.proxyOptions = proxyOptions;
