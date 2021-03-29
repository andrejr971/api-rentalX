import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AutenticateUserUseCase from './AutenticateUserUseCase';

export default class AutenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const autenticateUserUseCase = container.resolve(AutenticateUserUseCase);

    const { email, password } = request.body;

    const autenticateInfo = await autenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(autenticateInfo);
  }
}
