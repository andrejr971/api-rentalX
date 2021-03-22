import { Request, Response } from 'express';

import Specification from '../../model/Specification';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

export default class CreateSpecificationController {
  constructor(private createSpecification: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response<Specification> {
    const { name, description } = request.body;

    const specification = this.createSpecification.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}
