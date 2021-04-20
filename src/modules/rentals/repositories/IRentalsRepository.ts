import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import Rental from '../infra/typeorm/entities/Rental';

export default interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental | undefined>;
  findByUserId(id: string): Promise<Rental[]>;
}