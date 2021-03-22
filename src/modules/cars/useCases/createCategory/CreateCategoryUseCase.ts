import Category from '../../model/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '../../repositories/implementations/CategoriesRepository';

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICreateCategoryDTO): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exist');
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}
