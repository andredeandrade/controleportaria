import { HttpError } from '../lib/http-error.js';
export function authorizeRoles(...roles) {
    return (req, _res, next) => {
        if (!req.authUser) {
            throw new HttpError(401, 'Não autenticado.');
        }
        if (!roles.includes(req.authUser.role)) {
            throw new HttpError(403, 'Você não tem permissão para acessar este recurso.');
        }
        next();
    };
}
