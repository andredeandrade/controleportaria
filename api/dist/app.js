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
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { router } from './routes/index.js';
import { HttpError } from './lib/http-error.js';
export const app = express();
// ── Middlewares globais ──────────────────────────────────────────────────────
// Libera chamadas vindas do frontend
app.use(cors({
    origin: env.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Habilita leitura de JSON no body das requisições
app.use(express.json());
// ── Rotas ────────────────────────────────────────────────────────────────────
app.use('/api', router);
// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});
// ── Tratamento centralizado de erros ─────────────────────────────────────────
// Express 5 encaminha automaticamente erros de async para cá
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    res.status(500).json({
        error: env.nodeEnv === 'production' ? 'Erro interno do servidor.' : err.message,
    });
});
