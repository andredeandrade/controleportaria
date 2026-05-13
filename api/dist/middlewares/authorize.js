"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = authorizeRoles;
const http_error_js_1 = require("../lib/http-error.js");
function authorizeRoles(...roles) {
    return (req, _res, next) => {
        if (!req.authUser) {
            throw new http_error_js_1.HttpError(401, 'Não autenticado.');
        }
        if (!roles.includes(req.authUser.role)) {
            throw new http_error_js_1.HttpError(403, 'Você não tem permissão para acessar este recurso.');
        }
        next();
    };
}
