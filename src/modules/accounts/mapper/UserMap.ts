import { classToClass } from 'class-transformer';

import IUserResponseDTO from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

export default class UserMap {
  static toDTO({
    email,
    id,
    name,
    avatar,
    driver_license,
    getAvatarUrl,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      id,
      name,
      avatar,
      driver_license,
      getAvatarUrl,
    });

    return user;
  }
}
