import AppError from '@errors/AppErrors';
import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import CreateCategoryUseCase from './CreateCategoryUseCase';

describe('Create Category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'category test',
      description: 'Category description test',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'category test',
        description: 'Category description test',
      });

      await createCategoryUseCase.execute({
        name: 'category test',
        description: 'Category description test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
