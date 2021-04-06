import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarUseCase from './CreateCarUseCase';

export default class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    } = request.body;

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return response.status(201).json(car);
  }
}
