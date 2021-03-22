import SpecificationRepository from '../../repositories/implementations/SpecificationsRepository';
import CreateSpecificationController from './CreateSpecificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository,
);
const createSpecification = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecification };
