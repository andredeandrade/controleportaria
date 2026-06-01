"use strict";
/**
 * Instância única (singleton) do Prisma Client.
 *
 * O Prisma 7 com provider "prisma-client" usa o modelo de Driver Adapters:
 * em vez de um binário embutido, ele delega as queries ao driver nativo do
 * banco (pg para PostgreSQL). Isso melhora performance e compatibilidade.
 *
 * Reutiliza a mesma conexão durante o ciclo de vida do servidor,
 * evitando abrir múltiplas conexões com o banco de dados.
 * Em desenvolvimento, o hot-reload do tsx recriaria a instância
 * a cada mudança — o globalThis previne isso.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_js_1 = require("../generated/prisma/client.js");
const env_js_1 = require("../config/env.js");
const globalForPrisma = globalThis;
function createPrismaClient() {
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_js_1.env.databaseUrl });
    return new client_js_1.PrismaClient({
        adapter,
        log: env_js_1.env.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (env_js_1.env.nodeEnv !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
