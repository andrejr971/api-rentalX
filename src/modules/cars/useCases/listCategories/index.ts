import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListsCategoriesController from './ListsCategoriesController';

const categoryRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const listsCategoriesController = new ListsCategoriesController(
  listCategoriesUseCase,
);

export { listsCategoriesController };
