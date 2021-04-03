import { inject, injectable } from 'tsyringe';

import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import ISpecificationRepository from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppErrors';

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
