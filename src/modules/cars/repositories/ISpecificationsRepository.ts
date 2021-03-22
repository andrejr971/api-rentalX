import Specification from '../model/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification | undefined;
}
