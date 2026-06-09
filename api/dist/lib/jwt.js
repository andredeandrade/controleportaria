import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from './http-error.js';
export function signAccessToken(payload) {
    const options = {
        expiresIn: env.jwtExpiresIn,
    };
    return jwt.sign(payload, env.jwtSecret, options);
}
export function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, env.jwtSecret);
        if (!decoded || typeof decoded === 'string') {
            throw new HttpError(401, 'Token inválido.');
        }
        const payload = decoded;
        if (!payload.sub || !payload.email || !payload.role || !payload.condominiumId) {
            throw new HttpError(401, 'Token inválido.');
        }
        if (payload.role !== 'ADMIN' && payload.role !== 'PORTARIA') {
            throw new HttpError(401, 'Token inválido.');
        }
        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
            condominiumId: payload.condominiumId,
        };
    }
    catch (error) {
        if (error instanceof HttpError) {
            throw error;
        }
        throw new HttpError(401, 'Token inválido ou expirado.');
    }
}
