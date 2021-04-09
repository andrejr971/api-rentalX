import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description car',
      name: 'car available',
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_Brand',
      category_id: 'category_id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'car available',
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_Brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_Brand',
      category_id: 'category_id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'car available',
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'car available',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_Brand',
      category_id: 'category_id',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description car',
      name: 'car available',
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
