import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exist');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });

    return user;
  }
}
