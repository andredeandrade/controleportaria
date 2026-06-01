"use strict";
/**
 * Middlewares globais — em desenvolvimento.
 *
 * Futuramente conterá:
 * - authenticate.ts  → valida JWT e injeta usuário na requisição
 * - authorize.ts     → verifica permissões por role (admin, porteiro)
 * - validate.ts      → wrapper Zod para validar body/params/query
 * - rateLimiter.ts   → proteção contra abuso de endpoints
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticate = void 0;
var authenticate_js_1 = require("./authenticate.js");
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return authenticate_js_1.authenticate; } });
var authorize_js_1 = require("./authorize.js");
Object.defineProperty(exports, "authorizeRoles", { enumerable: true, get: function () { return authorize_js_1.authorizeRoles; } });
