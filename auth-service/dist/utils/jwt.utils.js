"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateAccessToken = (id, role) => {
    return jwt.sign({ id, role }, env_1.config.ACCESS_TOKEN_SECRET, { expiresIn: env_1.config.ACCESS_TOKEN_EXPIRES_IN });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id, role) => {
    return jwt.sign({ id, role }, env_1.config.REFRESH_TOKEN_SECRET, { expiresIn: env_1.config.REFRESH_TOKEN_EXPIRES_IN });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    return jwt.verify(token, env_1.config.REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
const setRefreshTokenCookie = (res, token) => {
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: env_1.config.NODE_ENV === "production",
        sameSite: "strict",
    });
};
exports.setRefreshTokenCookie = setRefreshTokenCookie;
