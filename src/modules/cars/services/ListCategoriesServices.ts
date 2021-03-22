import Category from '../model/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

export default class ListCategoriesServices {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
