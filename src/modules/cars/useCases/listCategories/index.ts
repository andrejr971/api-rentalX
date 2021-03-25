import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListsCategoriesController from './ListsCategoriesController';

export default (): ListsCategoriesController => {
  const categoryRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
  const listsCategoriesController = new ListsCategoriesController(
    listCategoriesUseCase,
  );

  return listsCategoriesController;
};
