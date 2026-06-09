import { prisma } from '../../lib/prisma.js';
import { HttpError } from '../../lib/http-error.js';
function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}
function slugify(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function validateName(name) {
    const normalized = normalizeName(name);
    if (normalized.length < 3) {
        throw new HttpError(400, 'Nome do condomínio deve ter ao menos 3 caracteres.');
    }
    return normalized;
}
function validateSlug(slug) {
    const normalized = slugify(slug);
    if (normalized.length < 3) {
        throw new HttpError(400, 'Slug do condomínio deve ter ao menos 3 caracteres.');
    }
    return normalized;
}
export const condominiumsService = {
    async create(input) {
        const name = validateName(input.name);
        const slug = validateSlug(input.slug ?? input.name);
        const existing = await prisma.condominium.findUnique({
            where: { slug },
            select: { id: true },
        });
        if (existing) {
            throw new HttpError(409, 'Já existe condomínio com esse slug.');
        }
        return prisma.condominium.create({
            data: {
                name,
                slug,
            },
        });
    },
    async getById(id) {
        const condominiumId = id.trim();
        if (!condominiumId) {
            throw new HttpError(400, 'ID do condomínio é obrigatório.');
        }
        const condominium = await prisma.condominium.findUnique({
            where: { id: condominiumId },
        });
        if (!condominium) {
            throw new HttpError(404, 'Condomínio não encontrado.');
        }
        return condominium;
    },
    async updateOwn(condominiumId, input) {
        const updates = {};
        if (input.name !== undefined) {
            updates.name = validateName(input.name);
        }
        if (input.slug !== undefined) {
            updates.slug = validateSlug(input.slug);
        }
        if (Object.keys(updates).length === 0) {
            throw new HttpError(400, 'Nenhum campo válido para atualização foi enviado.');
        }
        if (updates.slug) {
            const existing = await prisma.condominium.findUnique({
                where: { slug: updates.slug },
                select: { id: true },
            });
            if (existing && existing.id !== condominiumId) {
                throw new HttpError(409, 'Já existe condomínio com esse slug.');
            }
        }
        return prisma.condominium.update({
            where: { id: condominiumId },
            data: updates,
        });
    },
};
