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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signOut = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const async_await_middleware_1 = require("../middlewares/async-await.middleware");
const user_1 = require("../models/user");
const logger_utils_1 = require("../utils/logger.utils");
const types_1 = require("../types");
const db_1 = require("../config/db");
const jwt_utils_1 = require("../utils/jwt.utils");
const refresh_token_1 = require("../models/refresh-token");
const signUp = (0, async_await_middleware_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    logger_utils_1.logger.info(`User sign up with`, {
        email: email,
    });
    const existingUser = yield user_1.Users.findOne({
        where: { email },
    });
    if (existingUser) {
        logger_utils_1.logger.warn("User already exists", {
            email,
        });
        return next(new types_1.BadRequestError("User already exists"));
    }
    const transaction = yield db_1.sequelize.transaction();
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield user_1.Users.create({ email, password: hashedPassword, role }, { transaction });
        const accessToken = (0, jwt_utils_1.generateAccessToken)(user.id, user.role);
        const refreshToken = (0, jwt_utils_1.generateRefreshToken)(user.id, user.role);
        yield refresh_token_1.RefreshToken.create({ token: refreshToken, user_id: user.id }, { transaction });
        yield transaction.commit();
        (0, jwt_utils_1.setRefreshTokenCookie)(res, refreshToken);
        res.status(201).json({
            success: true,
            message: "User created succcessfully",
            data: {
                token: accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    }
    catch (err) {
        yield transaction.rollback();
        logger_utils_1.logger.error("Unable to create user", {
            message: err.message,
            stack: err.stack,
        });
        return next(new Error("Internale Server Error"));
    }
}));
exports.signUp = signUp;
const signIn = (0, async_await_middleware_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    logger_utils_1.logger.info("User sign in request", {
        email,
    });
    const existingUser = yield user_1.Users.findOne({
        where: { email },
    });
    if (!existingUser) {
        return next(new types_1.NotFoundError("User doesn't exist"));
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, (existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) || "");
    if (!isPasswordValid) {
        return next(new types_1.UnauthorizedError("Invalid password"));
    }
    yield refresh_token_1.RefreshToken.update({
        is_revoked: true,
    }, {
        where: {
            user_id: existingUser.id,
            is_revoked: false,
        },
    });
    const accessToken = (0, jwt_utils_1.generateAccessToken)((existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) || "", (existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) || "");
    const refreshToken = (0, jwt_utils_1.generateRefreshToken)((existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) || "", (existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) || "");
    yield refresh_token_1.RefreshToken.create({
        user_id: (existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) || "",
        token: refreshToken,
    });
    (0, jwt_utils_1.setRefreshTokenCookie)(res, refreshToken);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            user: {
                id: (existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) || "",
                email: (existingUser === null || existingUser === void 0 ? void 0 : existingUser.email) || "",
                role: (existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) || "",
            },
            token: accessToken,
        },
    });
}));
exports.signIn = signIn;
const signOut = (0, async_await_middleware_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        logger_utils_1.logger.warn("user not logged in");
        return next(new types_1.BadRequestError("User not logged in"));
    }
    yield refresh_token_1.RefreshToken.update({ is_revoked: true }, { where: { token: refreshToken } });
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
}));
exports.signOut = signOut;
const refreshToken = (0, async_await_middleware_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        logger_utils_1.logger.warn("refresh token is missing");
        return next(new types_1.BadRequestError("refresh token is missing"));
    }
    const { id, role } = (0, jwt_utils_1.verifyRefreshToken)(refreshToken);
    if (!id || !role) {
        logger_utils_1.logger.warn("Invalid refresh token");
        return next(new types_1.BadRequestError("Invalid refresh token"));
    }
    const existingToken = yield refresh_token_1.RefreshToken.findOne({
        where: { token: refreshToken },
    });
    if (existingToken === null || existingToken === void 0 ? void 0 : existingToken.is_revoked) {
        logger_utils_1.logger.warn("Refresh token compromised. Please sign in again.", {
            refreshToken: existingToken,
        });
        return next(new types_1.BadRequestError("Refresh token compromised. Please sign in again."));
    }
    yield refresh_token_1.RefreshToken.update({ is_revoked: true }, { where: { user_id: id, is_revoked: false } });
    const accessToken = (0, jwt_utils_1.generateAccessToken)(id, role);
    const newRefreshToken = (0, jwt_utils_1.generateRefreshToken)(id, role);
    yield refresh_token_1.RefreshToken.create({ token: newRefreshToken, user_id: id });
    (0, jwt_utils_1.setRefreshTokenCookie)(res, newRefreshToken);
    res.status(201).json({
        success: true,
        message: "Refresh token updated successfully",
        data: {
            token: accessToken,
        },
    });
}));
exports.refreshToken = refreshToken;
