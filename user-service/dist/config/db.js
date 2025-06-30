"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dbConfig_1 = require("./dbConfig");
const env = (process.env.NODE_ENV || "development") ||
    "test" ||
    "production";
const configFile = dbConfig_1.config[env];
const sequelize = new sequelize_typescript_1.Sequelize({
    username: configFile.username,
    password: configFile.password,
    database: configFile.database,
    host: configFile.host,
    dialect: "postgres",
    pool: {
        min: 10,
        max: 30,
        idle: 20000,
        acquire: 60000,
    },
    retry: {
        max: 5,
    },
    models: [],
    logging: false,
});
exports.sequelize = sequelize;
