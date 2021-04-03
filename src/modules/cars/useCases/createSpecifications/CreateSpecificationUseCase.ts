import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppErrors';
import Specification from '@modules/cars/entities/Specification';
import ISpecificationRepository from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exist');
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}
