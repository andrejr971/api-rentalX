import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController';
import ListsCategoriesController from '@modules/cars/useCases/listCategories/ListsCategoriesController';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listsCategoriesController = new ListsCategoriesController();

categoriesRoutes.get('/', listsCategoriesController.handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post('/', ensureAdmin, createCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAdmin,
  importCategoryController.handle,
);

export default categoriesRoutes;
