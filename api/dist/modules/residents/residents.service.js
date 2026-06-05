import { prisma } from '../../lib/prisma.js';
import { HttpError } from '../../lib/http-error.js';
import { decryptText, encryptText } from '../../lib/crypto.js';
const PAGE_MIN = 1;
const PAGE_SIZE_MIN = 1;
const PAGE_SIZE_MAX = 100;
const RESIDENT_RELATION_TO_DB = {
    proprietario: 'PROPRIETARIO',
    inquilino: 'INQUILINO',
    dependente: 'DEPENDENTE',
};
const RESIDENT_RELATION_FROM_DB = {
    PROPRIETARIO: 'proprietario',
    INQUILINO: 'inquilino',
    DEPENDENTE: 'dependente',
};
const VEHICLE_TYPE_TO_DB = {
    carro: 'CARRO',
    moto: 'MOTO',
    outro: 'OUTRO',
};
const VEHICLE_TYPE_FROM_DB = {
    CARRO: 'carro',
    MOTO: 'moto',
    OUTRO: 'outro',
};
function normalizeOptionalText(value) {
    if (value === undefined || value === null) {
        return null;
    }
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function parseRelation(value) {
    if (value === 'proprietario' || value === 'inquilino' || value === 'dependente') {
        return value;
    }
    throw new HttpError(400, 'Vínculo inválido.');
}
function normalizeVehicleInput(vehicle, index) {
    const typeRaw = String(vehicle.type ?? '')
        .trim()
        .toLowerCase();
    const color = normalizeOptionalText(vehicle.color);
    const plate = normalizeOptionalText(vehicle.plate);
    const brandModel = normalizeOptionalText(vehicle.brandModel);
    const hasAnyValue = Boolean(typeRaw || color || plate || brandModel);
    if (!hasAnyValue) {
        return null;
    }
    if (typeRaw !== 'carro' && typeRaw !== 'moto' && typeRaw !== 'outro') {
        throw new HttpError(400, `Tipo de veículo inválido na posição ${index + 1}.`);
    }
    return {
        type: VEHICLE_TYPE_TO_DB[typeRaw],
        color,
        plate,
        brandModel,
    };
}
function normalizeVehiclesInput(vehicles) {
    if (!vehicles) {
        return [];
    }
    return vehicles
        .map((vehicle, index) => normalizeVehicleInput(vehicle, index))
        .filter((vehicle) => vehicle !== null);
}
function validateCreateInput(input) {
    const fullName = input.fullName.trim();
    const unit = input.unit.trim();
    const relation = parseRelation(input.relation);
    const email = normalizeOptionalText(input.email);
    const phone = normalizeOptionalText(input.phone);
    const document = normalizeOptionalText(input.document);
    const observations = normalizeOptionalText(input.observations);
    const vehicles = normalizeVehiclesInput(input.vehicles);
    if (fullName.length < 3) {
        throw new HttpError(400, 'Nome deve ter ao menos 3 caracteres.');
    }
    if (!unit) {
        throw new HttpError(400, 'Unidade é obrigatória.');
    }
    if (email && !validateEmail(email)) {
        throw new HttpError(400, 'E-mail inválido.');
    }
    if (!document) {
        throw new HttpError(400, 'Documento é obrigatório.');
    }
    if (document.length < 5) {
        throw new HttpError(400, 'Documento inválido.');
    }
    return {
        fullName,
        unit,
        relation: RESIDENT_RELATION_TO_DB[relation],
        email,
        phone,
        document,
        observations,
        vehicles,
    };
}
function validateUpdateInput(input) {
    const data = {};
    if (input.fullName !== undefined) {
        const fullName = input.fullName.trim();
        if (fullName.length < 3) {
            throw new HttpError(400, 'Nome deve ter ao menos 3 caracteres.');
        }
        data.fullName = fullName;
    }
    if (input.unit !== undefined) {
        const unit = input.unit.trim();
        if (!unit) {
            throw new HttpError(400, 'Unidade é obrigatória.');
        }
        data.unit = unit;
    }
    if (input.relation !== undefined) {
        data.relation = RESIDENT_RELATION_TO_DB[parseRelation(input.relation)];
    }
    if (input.email !== undefined) {
        const email = normalizeOptionalText(input.email);
        if (email && !validateEmail(email)) {
            throw new HttpError(400, 'E-mail inválido.');
        }
        data.email = email;
    }
    if (input.phone !== undefined) {
        data.phone = normalizeOptionalText(input.phone);
    }
    if (input.document !== undefined) {
        const document = normalizeOptionalText(input.document);
        if (document && document.length < 5) {
            throw new HttpError(400, 'Documento inválido.');
        }
        data.document = document;
    }
    if (input.observations !== undefined) {
        data.observations = normalizeOptionalText(input.observations);
    }
    if (input.vehicles !== undefined) {
        data.vehicles = normalizeVehiclesInput(input.vehicles);
    }
    if (Object.keys(data).length === 0) {
        throw new HttpError(400, 'Nenhum campo válido para atualização foi enviado.');
    }
    return data;
}
function parsePagination(input) {
    const page = Number(input.page);
    const pageSize = Number(input.pageSize);
    if (!Number.isInteger(page) || page < PAGE_MIN) {
        throw new HttpError(400, 'Parâmetro page inválido.');
    }
    if (!Number.isInteger(pageSize) || pageSize < PAGE_SIZE_MIN || pageSize > PAGE_SIZE_MAX) {
        throw new HttpError(400, `Parâmetro pageSize inválido. Use entre ${PAGE_SIZE_MIN} e ${PAGE_SIZE_MAX}.`);
    }
    const search = input.search?.trim() || undefined;
    return {
        page,
        pageSize,
        skip: (page - 1) * pageSize,
        search,
    };
}
function toResponse(resident) {
    return {
        id: resident.id,
        fullName: resident.fullName,
        unit: resident.unit,
        relation: RESIDENT_RELATION_FROM_DB[resident.relation],
        email: resident.emailEncrypted ? decryptText(resident.emailEncrypted) : null,
        phone: resident.phoneEncrypted ? decryptText(resident.phoneEncrypted) : null,
        document: resident.documentEncrypted ? decryptText(resident.documentEncrypted) : null,
        observations: resident.observationsEncrypted
            ? decryptText(resident.observationsEncrypted)
            : null,
        vehicles: resident.vehicles.map((vehicle) => ({
            id: vehicle.id,
            type: VEHICLE_TYPE_FROM_DB[vehicle.type],
            color: vehicle.color,
            plate: vehicle.plateEncrypted ? decryptText(vehicle.plateEncrypted) : null,
            brandModel: vehicle.brandModel,
        })),
        createdByUserId: resident.createdByUserId,
        createdAt: resident.createdAt,
        updatedAt: resident.updatedAt,
    };
}
export const residentsService = {
    async create(input) {
        const validated = validateCreateInput(input);
        const resident = await prisma.resident.create({
            data: {
                fullName: validated.fullName,
                unit: validated.unit,
                relation: validated.relation,
                emailEncrypted: validated.email ? encryptText(validated.email) : null,
                phoneEncrypted: validated.phone ? encryptText(validated.phone) : null,
                documentEncrypted: encryptText(validated.document),
                observationsEncrypted: validated.observations ? encryptText(validated.observations) : null,
                vehicles: validated.vehicles.length > 0
                    ? {
                        create: validated.vehicles.map((vehicle) => ({
                            type: vehicle.type,
                            color: vehicle.color,
                            plateEncrypted: vehicle.plate ? encryptText(vehicle.plate) : null,
                            brandModel: vehicle.brandModel,
                        })),
                    }
                    : undefined,
                createdByUserId: input.createdByUserId,
            },
            include: {
                vehicles: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        return toResponse(resident);
    },
    async list(input) {
        const { page, pageSize, skip, search } = parsePagination(input);
        const where = search
            ? {
                OR: [
                    { fullName: { contains: search, mode: 'insensitive' } },
                    { unit: { contains: search, mode: 'insensitive' } },
                ],
            }
            : undefined;
        const [items, total] = await prisma.$transaction([
            prisma.resident.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: {
                    vehicles: {
                        orderBy: { createdAt: 'asc' },
                    },
                },
            }),
            prisma.resident.count({ where }),
        ]);
        return {
            items: items.map((resident) => toResponse(resident)),
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.max(1, Math.ceil(total / pageSize)),
            },
        };
    },
    async getById(id) {
        const residentId = id.trim();
        if (!residentId) {
            throw new HttpError(400, 'ID do morador é obrigatório.');
        }
        const resident = await prisma.resident.findUnique({
            where: { id: residentId },
            include: {
                vehicles: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!resident) {
            throw new HttpError(404, 'Morador não encontrado.');
        }
        return toResponse(resident);
    },
    async update(id, input) {
        const residentId = id.trim();
        if (!residentId) {
            throw new HttpError(400, 'ID do morador é obrigatório.');
        }
        const validated = validateUpdateInput(input);
        const exists = await prisma.resident.findUnique({
            where: { id: residentId },
            select: { id: true },
        });
        if (!exists) {
            throw new HttpError(404, 'Morador não encontrado.');
        }
        const resident = await prisma.resident.update({
            where: { id: residentId },
            data: {
                fullName: validated.fullName,
                unit: validated.unit,
                relation: validated.relation,
                emailEncrypted: validated.email === undefined
                    ? undefined
                    : validated.email
                        ? encryptText(validated.email)
                        : null,
                phoneEncrypted: validated.phone === undefined
                    ? undefined
                    : validated.phone
                        ? encryptText(validated.phone)
                        : null,
                documentEncrypted: validated.document === undefined
                    ? undefined
                    : validated.document
                        ? encryptText(validated.document)
                        : null,
                observationsEncrypted: validated.observations === undefined
                    ? undefined
                    : validated.observations
                        ? encryptText(validated.observations)
                        : null,
                vehicles: validated.vehicles === undefined
                    ? undefined
                    : {
                        deleteMany: {},
                        create: validated.vehicles.map((vehicle) => ({
                            type: vehicle.type,
                            color: vehicle.color,
                            plateEncrypted: vehicle.plate ? encryptText(vehicle.plate) : null,
                            brandModel: vehicle.brandModel,
                        })),
                    },
            },
            include: {
                vehicles: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        return toResponse(resident);
    },
    async remove(id) {
        const residentId = id.trim();
        if (!residentId) {
            throw new HttpError(400, 'ID do morador é obrigatório.');
        }
        const exists = await prisma.resident.findUnique({
            where: { id: residentId },
            select: { id: true },
        });
        if (!exists) {
            throw new HttpError(404, 'Morador não encontrado.');
        }
        await prisma.resident.delete({
            where: { id: residentId },
        });
    },
};
