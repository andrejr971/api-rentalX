import { Router } from 'express';

import { createSpecification } from '../modules/cars/useCases/createSpecifications';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
  createSpecification.handle(request, response);
});

export default specificationRoutes;
