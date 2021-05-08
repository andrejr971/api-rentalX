import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationsController from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadsCarImageController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carRoutes.get('/available', listAvailableCarsController.handle);

carRoutes.use(ensureAuthenticated);
carRoutes.post('/', ensureAdmin, createCarController.handle);
carRoutes.post(
  '/specifications/:id',
  ensureAdmin,
  createCarSpecificationsController.handle,
);
carRoutes.post(
  '/images/:id',
  ensureAdmin,
  upload.array('images'),
  uploadsCarImageController.handle,
);

export default carRoutes;
