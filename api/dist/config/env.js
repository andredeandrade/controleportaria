"use strict";
/**
 * Valida e exporta as variáveis de ambiente da aplicação.
 * Se uma variável obrigatória estiver ausente, o processo encerra na inicialização
 * em vez de falhar silenciosamente em tempo de execução.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
    }
    return value;
}
exports.env = {
    port: Number(process.env['PORT'] ?? 3333),
    databaseUrl: required('DATABASE_URL'),
    corsOrigin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
    jwtSecret: required('JWT_SECRET'),
    jwtExpiresIn: process.env['JWT_EXPIRES_IN'] ?? '1d',
    dataEncryptionKey: required('DATA_ENCRYPTION_KEY'),
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
};
