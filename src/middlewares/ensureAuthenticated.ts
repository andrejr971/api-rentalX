import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppErrors';
import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

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

  if (!autheHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = autheHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '8e2a5388a841e60dfbc9a3835671f26f',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Ivalid token!', 401);
  }
}
