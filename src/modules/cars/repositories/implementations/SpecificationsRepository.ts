import Specification from '../../model/Specification';
import ISpecificationRepository, {
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

export default class SpecificationRepository
  implements ISpecificationRepository {
  private specifications: Specification[];

  private static INSTACE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTACE) {
      SpecificationRepository.INSTACE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTACE;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );

    return specification;
  }

  create(data: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      ...data,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }
}
