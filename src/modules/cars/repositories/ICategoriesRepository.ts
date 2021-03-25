import Category from '../entities/Category';
import { ICreateCategoryDTO } from './implementations/CategoriesRepository';

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create(date: ICreateCategoryDTO): Promise<Category>;
}
