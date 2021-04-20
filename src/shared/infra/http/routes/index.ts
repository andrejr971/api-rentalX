import { Router } from 'express';

import autenticateRoutes from './autenticate.routes';
import carRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import passwordRoutes from './password.routes';
import rentalRoutes from './rental.routes';
import specificationRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/password', passwordRoutes);
routes.use(autenticateRoutes);

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', usersRoutes);
routes.use('/cars', carRoutes);
routes.use('/rentals', rentalRoutes);

export default routes;
