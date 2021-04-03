import { inject, injectable } from 'tsyringe';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppErrors';

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
