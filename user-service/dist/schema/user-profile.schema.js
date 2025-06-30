"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileUpadetSchema = exports.userRoleUpdateSchema = exports.userQuerySchema = exports.userProfileSchema = void 0;
const zod_1 = require("zod");
const ethiopianPhoneRegex = /^(?:\+251|251|0)?[79]\d{8}$/;
const userProfileSchema = zod_1.z.object({
    first_name: zod_1.z.string().trim().min(2, "first name should be atleast two characters"),
    last_name: zod_1.z.string().trim().min(2, "last name should be atleast two characters"),
    bio: zod_1.z.string().trim().min(10, "bio should be atleast 10 characters").optional(),
    phone_number: zod_1.z.string().regex(ethiopianPhoneRegex, { message: 'Invalid Ethiopian phone number (must start with 07 or 09)' }).transform((val) => {
        if (val.startsWith('0'))
            return '+251' + val.slice(1);
        if (val.startsWith('251'))
            return '+' + val;
        return val;
    })
});
exports.userProfileSchema = userProfileSchema;
const userQuerySchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    role: zod_1.z.enum(['attendee', 'organizer', 'admin']).optional(),
    sortBy: zod_1.z.enum(['createdAt', 'first_name', 'last_name']).optional(),
    order: zod_1.z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
});
exports.userQuerySchema = userQuerySchema;
const userRoleUpdateSchema = zod_1.z.object({
    role: zod_1.z.enum(['attendee', 'organizer', 'admin']).optional(),
});
exports.userRoleUpdateSchema = userRoleUpdateSchema;
const userProfileUpadetSchema = zod_1.z.object({
    first_name: zod_1.z.string().trim().min(2, "first name should be atleast two characters").optional(),
    last_name: zod_1.z.string().trim().min(2, "last name should be atleast two characters").optional(),
    bio: zod_1.z.string().trim().min(10, "bio should be atleast 10 characters").optional(),
    phone_number: zod_1.z.string().regex(ethiopianPhoneRegex, { message: 'Invalid Ethiopian phone number (must start with 07 or 09)' }).transform((val) => {
        if (val.startsWith('0'))
            return '+251' + val.slice(1);
        if (val.startsWith('251'))
            return '+' + val;
        return val;
    }).optional(),
});
exports.userProfileUpadetSchema = userProfileUpadetSchema;
