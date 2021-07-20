import { Router } from 'express';
import ProductController  from './ProductController';

const controller = new ProductController();
const routes = Router();

routes.get('/', controller.index);
routes.post('/', controller.store);
routes.get('/:sku', controller.show);
routes.delete('/:sku', controller.delete);
routes.put('/:sku', controller.update);

export default routes;
