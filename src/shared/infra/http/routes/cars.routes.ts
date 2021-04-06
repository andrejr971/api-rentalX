import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carRoutes = Router();
const createCarController = new CreateCarController();

carRoutes.use(ensureAuthenticated);
carRoutes.post('/', createCarController.handle);

export default carRoutes;
