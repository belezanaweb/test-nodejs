import { Router } from 'express';
import ProductController  from './ProductController';
import ProductSchemas  from './ProductSchemas';
import SchemaValidator  from '../SchemaValidator';

const controller = new ProductController();
const routes = Router();

routes.get('/', controller.index);
routes.post('/', SchemaValidator(ProductSchemas.insert()), controller.store);
routes.get('/:sku', controller.show);
routes.delete('/:sku', controller.delete);
routes.put('/:sku', SchemaValidator(ProductSchemas.update()), controller.update);

export default routes;
