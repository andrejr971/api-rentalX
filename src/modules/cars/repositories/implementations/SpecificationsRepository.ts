import { getRepository, Repository } from 'typeorm';

import Specification from '../../entities/Specification';
import ISpecificationRepository, {
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

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
