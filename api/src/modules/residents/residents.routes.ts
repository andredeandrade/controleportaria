import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { residentsController } from './residents.controller.js'

export const residentsRouter = Router()

residentsRouter.use(authenticate)

residentsRouter.post('/', residentsController.create)
residentsRouter.get('/', residentsController.list)
residentsRouter.get('/:id', residentsController.getById)
residentsRouter.put('/:id', residentsController.update)
residentsRouter.delete('/:id', residentsController.remove)
