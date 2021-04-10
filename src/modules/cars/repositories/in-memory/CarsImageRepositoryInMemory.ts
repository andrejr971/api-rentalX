import CarsImages from '@modules/cars/infra/typeorm/entities/CarsImages';

import ICarsImageRepository from '../ICarsImageRepository';

export default class CarsImageRepositoryInMemory
  implements ICarsImageRepository {
  async create(car_id: string, image_name: string): Promise<CarsImages> {
    throw new Error('Method not implemented.');
  }
}
