import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { eventsController } from './events.controller.js'

export const eventsRouter = Router()

eventsRouter.use(authenticate)

eventsRouter.post('/', eventsController.create)
eventsRouter.get('/', eventsController.list)
eventsRouter.get('/:id', eventsController.getById)
eventsRouter.patch('/:id', eventsController.update)
eventsRouter.delete('/:id', eventsController.remove)
