import UsersRepositoryInMemoty from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemoty';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-Memory/MailProviderInMemory';
import AppError from '@shared/errors/AppErrors';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersRepositoryInMemoty: UsersRepositoryInMemoty;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemoty = new UsersRepositoryInMemoty();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemoty,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a mail to user', async () => {
    const sendMAil = spyOn(mailProviderInMemory, 'sendMail');

    const user = await usersRepositoryInMemoty.create({
      driver_license: '678918',
      email: 'rem@buzdu.ma',
      password: '123456',
      name: 'Jaumeb',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMAil).toBeCalled();
  });

  it('should not be able to send a mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('gulapjaw@beneti.cg'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    const user = await usersRepositoryInMemoty.create({
      driver_license: '678978',
      email: 'rem@buzghjghdu.ma',
      password: '123456',
      name: 'Jaumeb',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toBeCalled();
  });
});
