import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppErrors';
import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '../../repositories/implementations/CategoriesRepository';

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exist');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
