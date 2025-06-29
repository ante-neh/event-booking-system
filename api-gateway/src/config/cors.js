"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['PUT', "PATCH", 'GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credientials: true,
};
const corsConfig = (0, cors_1.default)(corsOptions);
exports.corsConfig = corsConfig;
