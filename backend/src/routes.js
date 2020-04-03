import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Session from './app/controllers/SessionController';
import Recipients from './app/controllers/RecipientsController';
import File from './app/controllers/FileController';
import DeliveryMan from './app/controllers/DeliveryManController';
import Delivery from './app/controllers/DeliveryController';
import DeliveryManDeliveries from './app/controllers/DeliveryManDeliveriesController';
import DeliveryPendings from './app/controllers/DeliveryPendingsController';
import Auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', Session.store);

// DeliveryMan Deliveries
routes.get('/deliveryman/:id/deliveries', DeliveryManDeliveries.index);

routes.get('/delivery/:id/pendings', DeliveryPendings.index);
routes.put('/delivery/:id/withdraw', DeliveryPendings.store);
// routes.put('/delivery/:id/deliver', DeliveryPendings.update);

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

// Delivery
routes.post('/delivery', Delivery.store);
routes.get('/delivery', Delivery.index);
routes.delete('/delivery/:id', Delivery.delete);
routes.put('/delivery/:id', Delivery.update);

export default routes;
