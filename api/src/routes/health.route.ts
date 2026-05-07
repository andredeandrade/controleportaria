/**
 * Rota de health check: GET /api/health
 *
 * Verifica se o servidor está de pé e se o banco de dados
 * responde corretamente. Ideal para monitoramento e plataformas
 * de deploy (Vercel, Railway, etc.) saberem se a API está saudável.
 */

import { Router, type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.js'

export const healthRouter = Router()

healthRouter.get('/', async (_req: Request, res: Response) => {
  // Testa conexão real com o banco com uma query leve
  await prisma.$queryRaw`SELECT 1`

  res.json({
    status: 'ok',
    service: 'controleportaria-api',
    timestamp: new Date().toISOString(),
    database: 'connected',
  })
})
