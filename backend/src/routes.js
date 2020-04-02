import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Session from './app/controllers/SessionController';
import Recipients from './app/controllers/RecipientsController';
import File from './app/controllers/FileController';
import DeliveryMan from './app/controllers/DeliveryManController';
import Auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', Session.store);

routes.use(Auth);

// Recipients
routes.post('/recipients', Recipients.store);
routes.put('/recipients/:id', Recipients.update);

routes.post('/files', upload.single('file'), File.store);

// DeliveryMan
routes.post('/deliveryman', DeliveryMan.store);
routes.get('/deliveryman', DeliveryMan.index);
routes.put('/deliveryman/:id', DeliveryMan.update);
routes.delete('/deliveryman/:id', DeliveryMan.delete);

export default routes;
