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
exports.updateUserRole = exports.deleteUserProfile = exports.updateUserProfile = exports.getUserProfiles = exports.getUserProfile = exports.createUserProfile = void 0;
const async_middlewares_1 = require("../middlewares/async.middlewares");
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const user_profile_models_1 = require("../models/user-profile.models");
const sequelize_1 = require("sequelize");
const createUserProfile = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { first_name, last_name, bio, phone_number } = req.body;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!user_id) {
            logger_1.logger.warn("Invalid request", {
                message: "User ID is missing from the request",
                method: req.method,
                url: req.originalUrl,
            });
            return next(new types_1.BadRequestError("User ID is missing"));
        }
        const user = yield user_profile_models_1.UsersProfile.findOne({ where: { user_id } });
        if (user) {
            logger_1.logger.warn("User already has a profile", {
                message: "User already has a profile",
                method: req.method,
                url: req.originalUrl,
                user_id,
            });
            return next(new types_1.BadRequestError("User already has a profile"));
        }
        const userProfile = yield user_profile_models_1.UsersProfile.create({
            user_id,
            first_name,
            last_name,
            bio,
            phone_number,
        });
        logger_1.logger.info("User Profile created", {
            method: req.method,
            url: req.originalUrl,
            role: ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) || "attendee",
        });
        return res.status(201).json({
            status: true,
            message: "User profile created successfully",
            data: {
                user_profile: userProfile,
            },
        });
    }
    catch (err) {
        return next(err);
    }
}));
exports.createUserProfile = createUserProfile;
const getUserProfile = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user_id = req.params.id;
    try {
        if (!user_id) {
            logger_1.logger.warn("Invalid request", {
                message: "User ID is missing from the request",
            });
            return next(new types_1.BadRequestError("User ID is missing"));
        }
        const user_profile = yield user_profile_models_1.UsersProfile.findOne({ where: { user_id } });
        logger_1.logger.info("User profile request", {
            method: req.method,
            url: req.originalUrl,
            role: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "attendee",
        });
        return res.status(200).json({
            success: true,
            message: "",
            data: {
                user_profile,
            },
        });
    }
    catch (err) {
        logger_1.logger.info("Error fetching user profile", {
            method: req.method,
            url: req.originalUrl,
            role: ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) || "attendee",
            user_id,
            err,
        });
        return next(err);
    }
}));
exports.getUserProfile = getUserProfile;
const getUserProfiles = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const { search, role, sortBy = "createdAt", order = "DESC" } = req.query;
    try {
        const whereCondition = {};
        if (search.trim()) {
            whereCondition[sequelize_1.Op.or] = {
                first_name: { [sequelize_1.Op.iLike]: `%${search}%` },
                last_name: { [sequelize_1.Op.iLike]: `%${search}%` },
            };
        }
        if (role) {
            whereCondition.role = role;
        }
        logger_1.logger.info("User profiles fetched with", {
            offset,
            page,
            limit,
            where: whereCondition,
            sortBy,
            order,
        });
        const userProfiles = yield user_profile_models_1.UsersProfile.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [[sortBy, order.toUpperCase()]],
        });
        const totalPages = Math.ceil(userProfiles.count / limit);
        return res.status(200).json({
            success: true,
            message: "User profiles",
            data: {
                users: userProfiles.rows,
            },
            pagination: {
                totalCount: userProfiles.count,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    }
    catch (err) {
        logger_1.logger.error("Error occurred", {
            method: req.method,
            url: req.originalUrl,
            error: err,
        });
        return next(err);
    }
}));
exports.getUserProfiles = getUserProfiles;
const updateUserProfile = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    const { first_name, last_name, phone_number, bio } = req.body;
    try {
        const user = yield user_profile_models_1.UsersProfile.findOne({ where: { user_id } });
        if (!user) {
            logger_1.logger.warn("User profile doesn't exist", {
                method: req.method,
                url: req.originalUrl,
                user_id,
            });
            return next(new types_1.BadRequestError("User profile doesn't exist"));
        }
        yield user.update({ first_name, last_name, phone_number, bio });
        logger_1.logger.info("User profile updated successfully", {
            method: req.method,
            url: req.originalUrl,
            user_id,
        });
        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: {
                user,
            },
        });
    }
    catch (err) {
        logger_1.logger.error("Error updating user profile", {
            method: req.method,
            url: req.originalUrl,
            user_id,
            err,
        });
        return next(err);
    }
}));
exports.updateUserProfile = updateUserProfile;
const deleteUserProfile = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    try {
        if (!user_id) {
            logger_1.logger.warn("User id is required", {
                method: req.method,
                url: req.originalUrl,
            });
            return next(new types_1.BadRequestError("User id is required"));
        }
        const user = yield user_profile_models_1.UsersProfile.findOne({ where: { user_id } });
        if (!user) {
            logger_1.logger.warn("User profile doesn't exist", {
                method: req.method,
                url: req.originalUrl,
                user_id,
            });
            return next(new types_1.BadRequestError("User profile doesn't exist"));
        }
        yield user.destroy();
        return res.status(204).json({
            success: true,
            message: "User profile deleted successfully",
        });
    }
    catch (err) {
        logger_1.logger.error("Error deleting user profile", {
            method: req.method,
            url: req.originalUrl,
            user_id,
            err,
        });
        return next(err);
    }
}));
exports.deleteUserProfile = deleteUserProfile;
const updateUserRole = (0, async_middlewares_1.asyncAwaitHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = req.params.id;
    const role = req.body.role;
    try {
        if (!user_id) {
            logger_1.logger.warn("User id is required", {
                method: req.method,
                url: req.originalUrl,
                admin_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
            });
            return next(new types_1.BadRequestError("User id is required"));
        }
        const user = yield user_profile_models_1.UsersProfile.findOne({ where: { user_id } });
        if (!user) {
            logger_1.logger.warn("User profile doesn't exist", {
                method: req.method,
                url: req.originalUrl,
                user_id,
            });
            return next(new types_1.BadRequestError("User profile doesn't exist"));
        }
        yield user.update({ role });
        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: {
                user
            }
        });
    }
    catch (err) {
        logger_1.logger.error("Error updating user role", {
            method: req.method,
            url: req.originalUrl,
            user_id,
            err,
        });
        return next(err);
    }
}));
exports.updateUserRole = updateUserRole;
