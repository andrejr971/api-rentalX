import { inject, injectable } from 'tsyringe';

import IUserResponseDTO from '@modules/accounts/dtos/IUserResponseDTO';
import UserMap from '@modules/accounts/mapper/UserMap';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppErrors';

@injectable()
export default class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    delete user.password;

    return UserMap.toDTO(user);
  }
}
