"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const prisma_js_1 = require("../lib/prisma.js");
const jwt_js_1 = require("../lib/jwt.js");
const http_error_js_1 = require("../lib/http-error.js");
function extractBearerToken(authorizationHeader) {
    if (!authorizationHeader) {
        throw new http_error_js_1.HttpError(401, 'Token não informado.');
    }
    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new http_error_js_1.HttpError(401, 'Formato de token inválido.');
    }
    return token;
}
async function authenticate(req, _res, next) {
    const token = extractBearerToken(req.headers.authorization);
    const payload = (0, jwt_js_1.verifyAccessToken)(token);
    const user = await prisma_js_1.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
            id: true,
            email: true,
            role: true,
            name: true,
        },
    });
    if (!user) {
        throw new http_error_js_1.HttpError(401, 'Usuário do token não encontrado.');
    }
    req.authUser = user;
    next();
}
