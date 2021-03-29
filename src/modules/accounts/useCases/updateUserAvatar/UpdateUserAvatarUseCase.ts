import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatarFile }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    return user;
  }
}
