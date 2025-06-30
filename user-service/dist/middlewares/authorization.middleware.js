"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const types_1 = require("../types");
const authorize = (allowedRoles) => (req, res, next) => {
    const { role } = req.user || { role: 'attendee' };
    if (!role) {
        return next(new types_1.UnauthorizedError(''));
    }
    if (!allowedRoles.includes(role)) {
        return next(new types_1.ForbiddenError("Forbidden: Access denied."));
    }
    next();
};
exports.authorize = authorize;
