import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';
import { ICreateCategoryDTO } from '../implementations/CategoriesRepository';

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);

    return category;
  }
}
