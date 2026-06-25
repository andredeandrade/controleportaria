import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { accessRecordsController } from './access-records.controller.js'

export const accessRecordsRouter = Router()

accessRecordsRouter.use(authenticate)

accessRecordsRouter.post('/check-in', accessRecordsController.checkIn)
accessRecordsRouter.post('/:id/check-out', accessRecordsController.checkOut)
accessRecordsRouter.get('/', accessRecordsController.list)
accessRecordsRouter.get('/:id', accessRecordsController.getById)
