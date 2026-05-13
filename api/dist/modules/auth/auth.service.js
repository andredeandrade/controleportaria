"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const prisma_js_1 = require("../../lib/prisma.js");
const http_error_js_1 = require("../../lib/http-error.js");
const password_js_1 = require("../../lib/password.js");
const jwt_js_1 = require("../../lib/jwt.js");
const ALLOWED_ROLES = ['ADMIN', 'PORTARIA'];
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
    return password.length >= 8;
}
function validateRole(role) {
    if (!role) {
        return undefined;
    }
    if (!ALLOWED_ROLES.includes(role)) {
        throw new http_error_js_1.HttpError(400, 'Role inválida.');
    }
    return role;
}
exports.authService = {
    async register(input) {
        const name = input.name.trim();
        const email = normalizeEmail(input.email);
        const role = validateRole(input.role);
        if (name.length < 3) {
            throw new http_error_js_1.HttpError(400, 'Nome deve ter ao menos 3 caracteres.');
        }
        if (!validateEmail(email)) {
            throw new http_error_js_1.HttpError(400, 'E-mail inválido.');
        }
        if (!validatePassword(input.password)) {
            throw new http_error_js_1.HttpError(400, 'Senha deve ter no mínimo 8 caracteres.');
        }
        const existingUser = await prisma_js_1.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
        if (existingUser) {
            throw new http_error_js_1.HttpError(409, 'E-mail já cadastrado.');
        }
        const passwordHash = await (0, password_js_1.hashPassword)(input.password);
        const user = await prisma_js_1.prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: role ?? 'PORTARIA',
            },
        });
        const token = (0, jwt_js_1.signAccessToken)({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
    async login(input) {
        const email = normalizeEmail(input.email);
        if (!validateEmail(email) || !input.password) {
            throw new http_error_js_1.HttpError(400, 'Credenciais inválidas.');
        }
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new http_error_js_1.HttpError(401, 'E-mail ou senha inválidos.');
        }
        const passwordMatches = await (0, password_js_1.comparePassword)(input.password, user.passwordHash);
        if (!passwordMatches) {
            throw new http_error_js_1.HttpError(401, 'E-mail ou senha inválidos.');
        }
        const token = (0, jwt_js_1.signAccessToken)({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
};
