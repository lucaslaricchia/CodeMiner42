import { Router } from 'express'
import SurvivorController from './controllers/SurvivorController.js'

const routes = Router()

routes.get('/survivor', SurvivorController.index)
routes.get('/survivor/:id', SurvivorController.show)
routes.post('/survivor', SurvivorController.create)

routes.put('/survivor/:id', SurvivorController.update)
export default routes
