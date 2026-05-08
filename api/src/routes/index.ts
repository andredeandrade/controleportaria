/**
 * Centraliza todas as rotas da API.
 * Cada módulo futuro (auth, moradores, visitantes, etc.)
 * terá seu router registrado aqui.
 */

import { Router } from 'express'
import { healthRouter } from './health.route.js'
import { authRouter } from '../modules/auth/index.js'

export const router = Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)

// Futuros módulos serão registrados aqui:
// router.use('/auth', authRouter);
// router.use('/moradores', moradoresRouter);
// router.use('/visitantes', visitantesRouter);
