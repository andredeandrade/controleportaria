import { Router } from 'express'
import { authController } from './auth.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { authorizeRoles } from '../../middlewares/authorize.js'

export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

authRouter.get('/me', authenticate, authController.me)
authRouter.get('/admin-area', authenticate, authorizeRoles('ADMIN'), authController.adminArea)
