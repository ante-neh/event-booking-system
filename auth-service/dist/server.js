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
const logger_utils_1 = require("./utils/logger.utils");
const db_1 = require("./config/db");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.sequelize
            .authenticate()
            .then(() => {
            logger_utils_1.logger.info("Database connected successfully");
        })
            .catch((err) => {
            logger_utils_1.logger.error("Faild to connect to database", { err });
        });
        const server = (0, http_1.createServer)(app_1.app);
        server.listen(env_1.config.PORT, () => {
            logger_utils_1.logger.info(`Auth service running on port ${env_1.config.PORT}`);
        });
    }
    catch (err) {
        logger_utils_1.logger.error("Error starting server:", err);
        process.exit(1);
    }
});
startServer();
