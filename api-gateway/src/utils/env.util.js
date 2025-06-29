"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (key, required = true) => {
    const value = process.env[key];
    if (required && !value) {
        throw new Error(`Environment variable ${key} is required but not set. `);
    }
    return value;
};
exports.getEnv = getEnv;
