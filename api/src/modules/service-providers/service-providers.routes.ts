import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { serviceProvidersController } from './service-providers.controller.js'

export const serviceProvidersRouter = Router()

serviceProvidersRouter.use(authenticate)

serviceProvidersRouter.post('/', serviceProvidersController.create)
serviceProvidersRouter.get('/', serviceProvidersController.list)
serviceProvidersRouter.get('/:id', serviceProvidersController.getById)
serviceProvidersRouter.patch('/:id', serviceProvidersController.update)
serviceProvidersRouter.delete('/:id', serviceProvidersController.remove)
