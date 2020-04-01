import { Router } from 'express';
import Session from './app/controllers/SessionController';
import Recipients from './app/controllers/RecipientsController';
import Auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', Session.store);

routes.use(Auth);
routes.post('/recipients', Recipients.store);
routes.put('/recipients/:id', Recipients.update);

export default routes;
