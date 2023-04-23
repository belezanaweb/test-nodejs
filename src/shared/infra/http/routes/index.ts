import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../../swagger.json';
import productRoute from '../../../../modules/products/infra/http/routes';

const routes = Router();

routes.get('/', (_, res) => {
  return res.status(200).json({ message: 'Api Online' });
});

routes.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    explorer: true,
  }),
);

routes.use('/product', productRoute);

export default routes;
