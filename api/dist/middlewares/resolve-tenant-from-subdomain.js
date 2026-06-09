import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/http-error.js';
const IPV4_HOSTNAME_REGEX = /^\d{1,3}(?:\.\d{1,3}){3}$/;
function readForwardedHost(value) {
    if (!value) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value[0];
    }
    return value.split(',')[0]?.trim();
}
function stripPort(hostname) {
    return hostname.replace(/:\d+$/, '').toLowerCase();
}
function extractTenantSlug(hostname) {
    if (!hostname || hostname === 'localhost' || IPV4_HOSTNAME_REGEX.test(hostname)) {
        return null;
    }
    const parts = hostname.split('.').filter(Boolean);
    if (parts.length >= 2 && parts[parts.length - 1] === 'localhost') {
        return parts[0] ?? null;
    }
    if (parts.length < 3) {
        return null;
    }
    return parts[0] ?? null;
}
function getRequestHostname(req) {
    const forwardedHost = readForwardedHost(req.headers['x-forwarded-host']);
    const hostHeader = req.headers.host;
    const fallback = req.hostname;
    const rawHostname = forwardedHost || hostHeader || fallback;
    if (!rawHostname) {
        throw new HttpError(400, 'Host da requisição não identificado.');
    }
    return stripPort(rawHostname);
}
export async function resolveTenantFromSubdomain(req, _res, next) {
    const hostname = getRequestHostname(req);
    const tenantSlug = extractTenantSlug(hostname);
    if (!tenantSlug) {
        throw new HttpError(400, 'Subdomínio do condomínio não informado no host.');
    }
    const condominium = await prisma.condominium.findUnique({
        where: { slug: tenantSlug },
        select: {
            id: true,
            slug: true,
        },
    });
    if (!condominium) {
        throw new HttpError(404, 'Condomínio não encontrado para o subdomínio informado.');
    }
    req.tenant = condominium;
    next();
}
