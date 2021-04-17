import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

export default class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.ormRepository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.ormRepository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create(data);

    await this.ormRepository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.ormRepository.find({ where: { user_id }, relations: ['car'] });
  }
}
