import { Router } from 'express'
import SurvivorController from './controllers/SurvivorController.js'
import ReportsController from './controllers/ReportsController.js'

const routes = Router()

routes.get('/survivor', SurvivorController.index)
routes.get('/survivor/:id', SurvivorController.show)
routes.post('/survivor', SurvivorController.create)
routes.put('/survivor/:id', SurvivorController.update)

routes.get('/reports/infected', ReportsController.infected)
routes.get('/reports/non_infected', ReportsController.nonInfected)
routes.get('/reports/survivors_inventory', ReportsController.survivorsInventory)
routes.get('/reports/infected_points', ReportsController.infectedPoints)

export default routes
