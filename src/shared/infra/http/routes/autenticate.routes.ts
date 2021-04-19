import { Router } from 'express';

import AutenticateController from '@modules/accounts/useCases/authenticateUser/AutenticateUserController';
import RefreshTokenController from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const autenticateRoutes = Router();
const autenticateController = new AutenticateController();
const refreshTokenController = new RefreshTokenController();

autenticateRoutes.post('/session', autenticateController.handle);
autenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export default autenticateRoutes;
