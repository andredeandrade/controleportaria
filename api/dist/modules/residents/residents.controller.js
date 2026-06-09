import { HttpError } from '../../lib/http-error.js';
import { residentsService } from './residents.service.js';
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
function parseVehicles(value) {
    if (value === undefined) {
        return undefined;
    }
    if (!Array.isArray(value)) {
        throw new HttpError(400, 'Campo vehicles deve ser uma lista.');
    }
    return value.map((vehicle) => {
        if (!vehicle || typeof vehicle !== 'object') {
            throw new HttpError(400, 'Cada veículo deve ser um objeto válido.');
        }
        const vehicleRecord = vehicle;
        return {
            type: String(vehicleRecord['type'] ?? ''),
            color: readOptionalString(vehicleRecord['color']),
            plate: readOptionalString(vehicleRecord['plate']),
            brandModel: readOptionalString(vehicleRecord['brandModel']),
        };
    });
}
function parseUpdateInput(body) {
    const input = {};
    if ('fullName' in body) {
        input.fullName = String(body['fullName'] ?? '');
    }
    if ('unit' in body) {
        input.unit = String(body['unit'] ?? '');
    }
    if ('relation' in body) {
        input.relation = String(body['relation'] ?? '');
    }
    if ('email' in body) {
        input.email = readOptionalString(body['email']) ?? null;
    }
    if ('phone' in body) {
        input.phone = readOptionalString(body['phone']) ?? null;
    }
    if ('document' in body) {
        input.document = readOptionalString(body['document']) ?? null;
    }
    if ('observations' in body) {
        input.observations = readOptionalString(body['observations']) ?? null;
    }
    if ('vehicles' in body) {
        input.vehicles = parseVehicles(body['vehicles']);
    }
    return input;
}
export const residentsController = {
    async create(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const body = getBodyAsRecord(req.body);
        const resident = await residentsService.create({
            condominiumId: req.authUser.condominiumId,
            fullName: String(body['fullName'] ?? ''),
            unit: String(body['unit'] ?? ''),
            relation: String(body['relation'] ?? ''),
            email: readOptionalString(body['email']),
            phone: readOptionalString(body['phone']),
            document: String(body['document'] ?? ''),
            observations: readOptionalString(body['observations']),
            vehicles: parseVehicles(body['vehicles']),
            createdByUserId: req.authUser.id,
        });
        res.status(201).json(resident);
    },
    async list(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const result = await residentsService.list({
            condominiumId: req.authUser.condominiumId,
            page: Number(req.query['page'] ?? 1),
            pageSize: Number(req.query['pageSize'] ?? 10),
            search: req.query['search'] ? String(req.query['search']) : undefined,
        });
        res.json(result);
    },
    async getById(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const resident = await residentsService.getById(String(req.params['id'] ?? ''), req.authUser.condominiumId);
        res.json(resident);
    },
    async update(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        const body = getBodyAsRecord(req.body);
        const resident = await residentsService.update(String(req.params['id'] ?? ''), parseUpdateInput(body), req.authUser.condominiumId);
        res.json(resident);
    },
    async remove(req, res) {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        await residentsService.remove(String(req.params['id'] ?? ''), req.authUser.condominiumId);
        res.status(204).send();
    },
};
