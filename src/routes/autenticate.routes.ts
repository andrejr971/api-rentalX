import { Router } from 'express';

import AutenticateController from '../modules/accounts/useCases/authenticateUser/AutenticateUserController';

const autenticateRoutes = Router();
const autenticateController = new AutenticateController();

autenticateRoutes.post('/session', autenticateController.handle);

export default autenticateRoutes;
