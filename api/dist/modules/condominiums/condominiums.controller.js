import { HttpError } from '../../lib/http-error.js';
import { condominiumsService } from './condominiums.service.js';
function getBodyAsRecord(body) {
    if (!body || typeof body !== 'object') {
        throw new HttpError(400, 'Corpo da requisição inválido.');
    }
    return body;
}
function readOptionalString(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return '';
    }
    return String(value);
}
export const condominiumsController = {
    async create(req, res) {
        const body = getBodyAsRecord(req.body);
        const condominium = await condominiumsService.create({
            name: String(body['name'] ?? ''),
            slug: readOptionalString(body['slug']),
        });
        res.status(201).json(condominium);
    },
    async me(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const condominium = await condominiumsService.getById(req.authUser.condominiumId);
        res.json(condominium);
    },
    async updateMe(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const body = getBodyAsRecord(req.body);
        const condominium = await condominiumsService.updateOwn(req.authUser.condominiumId, {
            name: readOptionalString(body['name']),
            slug: readOptionalString(body['slug']),
        });
        res.json(condominium);
    },
};
