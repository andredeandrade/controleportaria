"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_js_1 = require("./auth.service.js");
const http_error_js_1 = require("../../lib/http-error.js");
function getBodyAsRecord(body) {
    if (!body || typeof body !== 'object') {
        throw new http_error_js_1.HttpError(400, 'Corpo da requisição inválido.');
    }
    return body;
}
exports.authController = {
    async register(req, res) {
        const body = getBodyAsRecord(req.body);
        const result = await auth_service_js_1.authService.register({
            name: String(body['name'] ?? ''),
            email: String(body['email'] ?? ''),
            password: String(body['password'] ?? ''),
            role: body['role'] === 'ADMIN' || body['role'] === 'PORTARIA' ? body['role'] : undefined,
        });
        res.status(201).json(result);
    },
    async login(req, res) {
        const body = getBodyAsRecord(req.body);
        const result = await auth_service_js_1.authService.login({
            email: String(body['email'] ?? ''),
            password: String(body['password'] ?? ''),
        });
        res.json(result);
    },
    async me(req, res) {
        if (!req.authUser) {
            throw new http_error_js_1.HttpError(401, 'Não autenticado.');
        }
        res.json({ user: req.authUser });
    },
    async adminArea(_req, res) {
        res.json({ message: 'Acesso liberado para ADMIN.' });
    },
};
