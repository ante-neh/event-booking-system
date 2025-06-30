"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
function getEnv(key, required = true) {
    const value = process.env[key];
    if (required && (!value || value.trim() === "")) {
        throw new Error(`Environment variable ${key} is required but was not provided`);
    }
    return value !== null && value !== void 0 ? value : "";
}
