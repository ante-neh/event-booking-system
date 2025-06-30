"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const config = {
    PORT: (0, utils_1.getEnv)("PORT"),
    NODE_ENV: (0, utils_1.getEnv)("NODE_ENV"),
    ACCESS_TOKEN_SECRET: (0, utils_1.getEnv)("ACCESS_TOKEN_SECRET")
};
exports.config = config;
