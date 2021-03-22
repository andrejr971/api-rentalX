import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use('/', routes);

app.listen(3333, () => {
  console.log('🚀 Serve started on port 3333');
});
