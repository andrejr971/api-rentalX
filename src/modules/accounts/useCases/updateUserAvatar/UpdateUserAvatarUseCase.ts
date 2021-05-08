import { inject, injectable } from 'tsyringe';

import User from '@modules/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatarFile }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    return user;
  }
}
