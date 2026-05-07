/**
 * Valida e exporta as variáveis de ambiente da aplicação.
 * Se uma variável obrigatória estiver ausente, o processo encerra na inicialização
 * em vez de falhar silenciosamente em tempo de execução.
 */

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`)
  }
  return value
}

export const env = {
  port: Number(process.env['PORT'] ?? 3333),
  databaseUrl: required('DATABASE_URL'),
  corsOrigin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
} as const
