import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';

import CreateCarSpecificationsUseCase from './CreateCarSpecificationsUseCase';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'Car specifications',
      fine_amount: 60,
    });

    const specification = await specificationRepositoryInMemory.create({
      description: 'Description test',
      name: 'Name test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    console.log(specificationsCars);

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['54321'];

      await createCarSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
