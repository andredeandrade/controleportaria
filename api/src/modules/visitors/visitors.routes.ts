import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { visitorsController } from './visitors.controller.js'

export const visitorsRouter = Router()

visitorsRouter.use(authenticate)

visitorsRouter.post('/', visitorsController.create)
visitorsRouter.get('/', visitorsController.list)
visitorsRouter.get('/:id', visitorsController.getById)
visitorsRouter.patch('/:id', visitorsController.update)
visitorsRouter.delete('/:id', visitorsController.remove)
