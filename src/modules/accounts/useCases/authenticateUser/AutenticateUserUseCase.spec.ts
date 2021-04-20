import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import UsersRepositoryInMemoty from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemoty';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppErrors';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AutenticateUserUseCase from './AutenticateUserUseCase';

let autenticateUserCase: AutenticateUserUseCase;
let usersRepositoryInMemoty: UsersRepositoryInMemoty;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Autenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemoty = new UsersRepositoryInMemoty();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    autenticateUserCase = new AutenticateUserUseCase(
      usersRepositoryInMemoty,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemoty);
  });

  it('should be able to autenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '123456',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await autenticateUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able autenticate an nonexistent user', async () => {
    await expect(
      autenticateUserCase.execute({
        email: 'user@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should bot be able to autenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '123456',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    await expect(
      autenticateUserCase.execute({
        email: user.email,
        password: '2323232',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should bot be able to autenticate with incorrect email', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '123456',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);
    await expect(
      autenticateUserCase.execute({
        email: 'test@teste.com',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
