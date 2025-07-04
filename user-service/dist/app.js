"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("./middlewares/error.middlewares");
const user_profile_routes_1 = require("./routes/user-profile.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/", user_profile_routes_1.userProfileRouter);
app.use(error_middlewares_1.errorMiddleware);
