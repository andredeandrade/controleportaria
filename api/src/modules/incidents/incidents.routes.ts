import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { incidentsController } from './incidents.controller.js'

export const incidentsRouter = Router()

incidentsRouter.use(authenticate)

incidentsRouter.post('/', incidentsController.create)
incidentsRouter.get('/', incidentsController.list)
incidentsRouter.get('/:id', incidentsController.getById)
incidentsRouter.patch('/:id', incidentsController.update)
incidentsRouter.delete('/:id', incidentsController.remove)
