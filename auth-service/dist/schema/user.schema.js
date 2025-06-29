"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email("invalid email address"),
    password: zod_1.z.string().min(6, "password must be at least 6 characters"),
    role: zod_1.z.enum(["admin", "organizer", "attendee"]).optional(),
});
exports.userSchema = userSchema;
