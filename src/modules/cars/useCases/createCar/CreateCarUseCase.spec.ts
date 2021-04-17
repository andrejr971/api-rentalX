import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';

import CreateCarUseCase from './CreateCarUseCase';

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'Name car',
      fine_amount: 60,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists lincese plate', async () => {
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'Name car 1',
      fine_amount: 60,
    });

    await expect(
      createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category id',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        description: 'Description car',
        name: 'Name car 2',
        fine_amount: 60,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with exists available true by  default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description car',
      name: 'Name car',
      fine_amount: 60,
    });

    expect(car.available).toBe(true);
  });
});
