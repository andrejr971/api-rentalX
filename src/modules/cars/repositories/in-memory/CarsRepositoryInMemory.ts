import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';

import ICarsRepository from '../ICarsRepository';

export default class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter(car => {
      if (
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { ...data });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findById(car_id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === car_id);
  }

  async updateAvaliable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id);

    this.cars[findIndex].available = available;
  }
}
