import { Router } from 'express';
import productRouter from './product.routes';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
