import CarsImage from '../infra/typeorm/entities/CarsImages';

export default interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarsImage>;
}
