import Specification from '../infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
}
