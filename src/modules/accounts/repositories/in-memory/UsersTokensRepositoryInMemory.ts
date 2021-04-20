import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens';

import IUsersTokensRepository from '../IUsersTokensRepository';

export default class UsersTokensRepositoryInMemory
  implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      token =>
        token.refresh_token === refresh_token && token.user_id === user_id,
    );
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens.filter(token => token.id !== id);
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      token => token.refresh_token === refresh_token,
    );
  }
}
