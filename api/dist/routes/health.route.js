"use strict";
/**
 * Rota de health check: GET /api/health
 *
 * Verifica se o servidor está de pé e se o banco de dados
 * responde corretamente. Ideal para monitoramento e plataformas
 * de deploy (Vercel, Railway, etc.) saberem se a API está saudável.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const prisma_js_1 = require("../lib/prisma.js");
exports.healthRouter = (0, express_1.Router)();
exports.healthRouter.get('/', async (_req, res) => {
    // Testa conexão real com o banco com uma query leve
    await prisma_js_1.prisma.$queryRaw `SELECT 1`;
    res.json({
        status: 'ok',
        service: 'controleportaria-api',
        timestamp: new Date().toISOString(),
        database: 'connected',
    });
});
