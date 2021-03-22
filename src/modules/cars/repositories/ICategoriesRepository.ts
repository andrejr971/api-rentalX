import Category from '../model/Category';
import { ICreateCategoryDTO } from './implementations/CategoriesRepository';

export default interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create(date: ICreateCategoryDTO): Category;
}
