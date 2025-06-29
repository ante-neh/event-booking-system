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
const http_1 = require("http");
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_util_1 = require("./utils/logger.util");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, http_1.createServer)(app_1.app);
    server.listen(env_1.config.PORT, () => {
        logger_util_1.logger.info("Server is running on:", { PORT: env_1.config.PORT });
        logger_util_1.logger.info("Auth service is runnig on:", { PORT: env_1.config.AUTH_SERVICE_URL });
        logger_util_1.logger.info("Admin service is runnig on:", { PORT: env_1.config.ADMIN_SERVICE_URL });
        logger_util_1.logger.info("Booking service is runnig on:", { PORT: env_1.config.BOOKING_SERVICE_URL });
        logger_util_1.logger.info("Event service is runnig on:", { PORT: env_1.config.EVENT_SERVICE_URL });
        logger_util_1.logger.info("Notification service is runnig on:", { PORT: env_1.config.NOTIFICATION_SERVICE_URL });
        logger_util_1.logger.info("Payment service is runnig on:", { PORT: env_1.config.PAYMENT_SERVICE_URL });
        logger_util_1.logger.info("User service is runnig on:", { PORT: env_1.config.USER_SERVICE_URL });
    });
});
start();
