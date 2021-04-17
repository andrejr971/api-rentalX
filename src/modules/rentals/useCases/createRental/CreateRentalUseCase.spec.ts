import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalRepositoryInMemory from '@modules/rentals/repositories/implementations/RentalRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppErrors';

import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoriyInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoriyInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoriyInMemory,
    );
  });

  it('should be able create a new rental', async () => {
    const car = await carsRepositoriyInMemory.create({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description car',
      name: 'Name car',
      fine_amount: 60,
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    // expect(rental).toHaveProperty('start_date');
  });

  it('should not be able create a new rental if there is another open to the same user', async () => {
    const car = await carsRepositoriyInMemory.create({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description car',
      name: 'Name car',
      fine_amount: 60,
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '123034',
        user_id: '121212',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it('should not be able create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoriyInMemory.create({
      brand: 'Brand',
      category_id: 'category id',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description car',
      name: 'Name car',
      fine_amount: 60,
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '1212120',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '1212X12',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'XXX',
        user_id: '112X12',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
