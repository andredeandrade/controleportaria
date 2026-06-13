import { Router } from 'express'
import { authRouter } from '../modules/auth/index.js'
import { condominiumsRouter } from '../modules/condominiums/index.js'
import { residentsRouter } from '../modules/residents/index.js'
import { serviceProvidersRouter } from '../modules/service-providers/index.js'
import { visitorsRouter } from '../modules/visitors/index.js'

export const router = Router()

router.use('/condominiums', condominiumsRouter)
router.use('/auth', authRouter)
router.use('/residents', residentsRouter)
router.use('/visitors', visitorsRouter)
router.use('/service-providers', serviceProvidersRouter)
