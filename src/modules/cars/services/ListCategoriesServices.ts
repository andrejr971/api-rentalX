import Category from '../entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

export default class ListCategoriesServices {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
