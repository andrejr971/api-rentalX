import Category from '../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../infra/typeorm/repositories/CategoriesRepository';

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create(date: ICreateCategoryDTO): Promise<Category>;
}
