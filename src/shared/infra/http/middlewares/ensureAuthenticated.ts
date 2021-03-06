import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
// import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
// import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import AppError from '@shared/errors/AppErrors';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const autheHeader = request.headers.authorization;
  // const usersTokensRepository = new UsersTokensRepository();

  if (!autheHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = autheHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    // const user = await usersTokensRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token,
    // );

    // if (!user) {
    //   throw new AppError('User does not exists', 401);
    // }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Ivalid token!', 401);
  }
}
