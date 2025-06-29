"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const config = {
    development: {
        username: process.env.DEVELOPMENT_PG_USER,
        password: process.env.DEVELOPMENT_PG_PASSWORD,
        database: process.env.DEVELOPMENT_PG_DATABASE,
        host: process.env.DEVELOPMENT_PG_HOST,
        dialect: "postgres",
    },
    test: {
        username: process.env.TEST_PG_USER,
        password: process.env.TEST_PG_PASSWORD,
        database: process.env.TEST_PG_DATABASE,
        host: process.env.TEST_PG_HOST,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: false,
        },
    },
    production: {
        username: process.env.PRODUCTION_PG_USER,
        password: process.env.PRODUCTION_PG_PASSWORD,
        database: process.env.PRODUCTION_PG_DATABASE,
        host: process.env.PRODUCTION_PG_HOST,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
exports.config = config;
