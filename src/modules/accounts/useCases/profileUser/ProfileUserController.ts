import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProfileUserUseCase from './ProfileUserUseCase';

export default class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await showUserUseCase.execute(id);

    return response.json(user);
  }
}
