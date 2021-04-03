import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppErrors';
import routes from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use('/', routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Serve started on port 3333');
});
