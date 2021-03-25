import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '../../repositories/implementations/CategoriesRepository';

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exist');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
