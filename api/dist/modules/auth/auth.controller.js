import { authService } from './auth.service.js';
import { HttpError } from '../../lib/http-error.js';
function getBodyAsRecord(body) {
    if (!body || typeof body !== 'object') {
        throw new HttpError(400, 'Corpo da requisição inválido.');
    }
    return body;
}
export const authController = {
    async register(req, res) {
        const body = getBodyAsRecord(req.body);
        const result = await authService.register({
            name: String(body['name'] ?? ''),
            email: String(body['email'] ?? ''),
            password: String(body['password'] ?? ''),
            role: body['role'] === 'ADMIN' || body['role'] === 'PORTARIA' ? body['role'] : undefined,
        });
        res.status(201).json(result);
    },
    async login(req, res) {
        const body = getBodyAsRecord(req.body);
        const result = await authService.login({
            email: String(body['email'] ?? ''),
            password: String(body['password'] ?? ''),
        });
        res.json(result);
    },
    async me(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        res.json({ user: req.authUser });
    },
    async adminArea(_req, res) {
        res.json({ message: 'Acesso liberado para ADMIN.' });
    },
};
