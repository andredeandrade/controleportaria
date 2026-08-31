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
eventsRouter.post('/:id/guests/:guestId/check-in', eventsController.checkInGuest)
eventsRouter.post('/:id/guests/:guestId/check-out', eventsController.checkOutGuest)
eventsRouter.post('/:id/vehicles', eventsController.createVehicle)
eventsRouter.post('/:id/vehicles/:vehicleId/check-out', eventsController.checkOutVehicle)
eventsRouter.delete('/:id/vehicles/:vehicleId', eventsController.deleteVehicle)
