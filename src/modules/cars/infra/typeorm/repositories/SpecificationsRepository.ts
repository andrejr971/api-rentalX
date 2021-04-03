import { getRepository, Repository } from 'typeorm';

import ISpecificationRepository, {
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';

import Specification from '../entities/Specification';

export default class SpecificationRepository
  implements ISpecificationRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.ormRepository.findOne({ where: { name } });

    return specification;
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create(data);

    await this.ormRepository.save(specification);

    return specification;
  }
}
