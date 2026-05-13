"use strict";
/**
 * Ponto de entrada do servidor.
 * Sobe a aplicação Express na porta configurada e
 * garante que conexões do Prisma são encerradas corretamente
 * quando o processo é interrompido.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const prisma_js_1 = require("./lib/prisma.js");
const env_js_1 = require("./config/env.js");
const server = app_js_1.app.listen(env_js_1.env.port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${env_js_1.env.port}`);
    console.log(`   Ambiente: ${env_js_1.env.nodeEnv}`);
});
// Encerra conexões do Prisma ao parar o servidor (Ctrl+C ou SIGTERM no deploy)
async function shutdown() {
    console.log('\nEncerrando servidor...');
    server.close(async () => {
        await prisma_js_1.prisma.$disconnect();
        process.exit(0);
    });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
