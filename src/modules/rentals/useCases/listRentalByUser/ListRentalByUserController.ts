import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListRentalByUserUseCase from './ListRentalByUserUseCase';

export default class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalUserUseCase = container.resolve(ListRentalByUserUseCase);

    const rentalByUser = await listRentalUserUseCase.execute(id);

    return response.json(rentalByUser);
  }
}
