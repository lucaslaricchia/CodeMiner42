import { Router } from 'express';

import SurvivorController from './controllers/SurvivorController';

const routes = Router();

routes.get('/survivor', SurvivorController.index);
routes.get('/survivor/:id', SurvivorController.show);
routes.post('/survivor', OrphanagesController.create);

export default routes;