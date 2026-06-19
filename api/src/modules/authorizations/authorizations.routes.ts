import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { authorizationsController } from './authorizations.controller.js'

export const authorizationsRouter = Router()

authorizationsRouter.use(authenticate)

authorizationsRouter.post('/', authorizationsController.create)
authorizationsRouter.get('/', authorizationsController.list)
authorizationsRouter.get('/:id', authorizationsController.getById)
authorizationsRouter.patch('/:id', authorizationsController.update)
authorizationsRouter.delete('/:id', authorizationsController.remove)
