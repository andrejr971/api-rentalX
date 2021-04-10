import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationsController from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();

carRoutes.get('/available', listAvailableCarsController.handle);

carRoutes.use(ensureAuthenticated);
carRoutes.post('/', ensureAdmin, createCarController.handle);
carRoutes.post(
  '/specifications/:id',
  ensureAdmin,
  createCarSpecificationsController.handle,
);

export default carRoutes;
