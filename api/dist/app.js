"use strict";
/**
 * Configura a aplicação Express:
 * - Middlewares globais (JSON, CORS)
 * - Prefixo /api para todas as rotas
 * - Tratamento de rotas não encontradas (404)
 * - Tratamento centralizado de erros
 *
 * Separado de server.ts para facilitar testes futuros
 * (importar app sem subir o servidor).
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_js_1 = require("./config/env.js");
const index_js_1 = require("./routes/index.js");
const http_error_js_1 = require("./lib/http-error.js");
exports.app = (0, express_1.default)();
// ── Middlewares globais ──────────────────────────────────────────────────────
// Libera chamadas vindas do frontend
exports.app.use((0, cors_1.default)({
    origin: env_js_1.env.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Habilita leitura de JSON no body das requisições
exports.app.use(express_1.default.json());
// ── Rotas ────────────────────────────────────────────────────────────────────
exports.app.use('/api', index_js_1.router);
// ── 404 ──────────────────────────────────────────────────────────────────────
exports.app.use((_req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});
// ── Tratamento centralizado de erros ─────────────────────────────────────────
// Express 5 encaminha automaticamente erros de async para cá
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.app.use((err, _req, res, _next) => {
    console.error(err);
    if (err instanceof http_error_js_1.HttpError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    res.status(500).json({
        error: env_js_1.env.nodeEnv === 'production' ? 'Erro interno do servidor.' : err.message,
    });
});
