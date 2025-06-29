"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceProxy = void 0;
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const env_1 = require("../config/env");
const proxy_1 = require("../config/proxy");
const logger_util_1 = require("../utils/logger.util");
const authServiceProxy = () => {
    return (0, express_http_proxy_1.default)(env_1.config.AUTH_SERVICE_URL, Object.assign(Object.assign({}, proxy_1.proxyOptions), { proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            proxyReqOpts.headers = Object.assign(Object.assign({}, (proxyReqOpts.headers || {})), { "Content-Type": "application/json" });
            return proxyReqOpts;
        }, userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            logger_util_1.logger.info("Response recieved from auth service", {
                statusCode: proxyRes.statusCode,
            });
            return proxyResData;
        } }));
};
exports.authServiceProxy = authServiceProxy;
