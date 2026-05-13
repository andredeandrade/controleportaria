"use strict";
/**
 * Módulo de autenticação — em desenvolvimento.
 *
 * Futuramente conterá:
 * - auth.routes.ts   → rotas POST /auth/login, POST /auth/refresh
 * - auth.controller.ts → recebe Request/Response
 * - auth.service.ts  → lógica: validar credenciais, gerar JWT
 * - auth.schema.ts   → schemas Zod para validação do body
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.authRouter = void 0;
var auth_routes_js_1 = require("./auth.routes.js");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_routes_js_1.authRouter; } });
var auth_service_js_1 = require("./auth.service.js");
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return auth_service_js_1.authService; } });
