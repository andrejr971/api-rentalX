import { getRepository, Repository } from 'typeorm';

import CarsImages from '@modules/cars/infra/typeorm/entities/CarsImages';
import ICarsImageRepository from '@modules/cars/repositories/ICarsImageRepository';

export default class CarsImageRepository implements ICarsImageRepository {
  private ormRepository: Repository<CarsImages>;

  constructor() {
    this.ormRepository = getRepository(CarsImages);
  }

  async create(car_id: string, image_name: string): Promise<CarsImages> {
    const carImage = this.ormRepository.create({
      car_id,
      image_name,
    });

    await this.ormRepository.save(carImage);

    return carImage;
  }
}
