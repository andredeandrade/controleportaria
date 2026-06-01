"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const http_error_js_1 = require("./http-error.js");
function signAccessToken(payload) {
    const options = {
        expiresIn: env_js_1.env.jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env_js_1.env.jwtSecret, options);
}
function verifyAccessToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.jwtSecret);
        if (!decoded || typeof decoded === 'string') {
            throw new http_error_js_1.HttpError(401, 'Token inválido.');
        }
        const payload = decoded;
        if (!payload.sub || !payload.email || !payload.role) {
            throw new http_error_js_1.HttpError(401, 'Token inválido.');
        }
        if (payload.role !== 'ADMIN' && payload.role !== 'PORTARIA') {
            throw new http_error_js_1.HttpError(401, 'Token inválido.');
        }
        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
    catch (error) {
        if (error instanceof http_error_js_1.HttpError) {
            throw error;
        }
        throw new http_error_js_1.HttpError(401, 'Token inválido ou expirado.');
    }
}
