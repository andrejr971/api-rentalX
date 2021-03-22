import Specification from '../../model/Specification';
import ISpecificationRepository from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new Error('Specification already exist');
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}
