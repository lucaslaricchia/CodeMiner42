import { Router } from 'express'
import SurvivorController from './controllers/SurvivorController.js'

const routes = Router()

routes.get('/survivor', SurvivorController.index)
routes.get('/survivor/:id', SurvivorController.show)
routes.post('/survivor', SurvivorController.create)

export default routes
