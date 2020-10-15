const Router = require('express');

const SurvivorController = require('./controllers/SurvivorController');

const routes = Router();

routes.get('/survivor', SurvivorController.index);
routes.get('/survivor/:id', SurvivorController.show);
routes.post('/survivor', OrphanagesController.create);

export default routes;