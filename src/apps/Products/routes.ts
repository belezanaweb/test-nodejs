import { Router } from 'express';

import * as controller from './ProductsController';
import { validateProductsPayload } from './validator';

const route = Router();

route.post('/', validateProductsPayload, controller.create);
route.get('/:sku', controller.findOne);
route.put('/:sku', controller.update);
route.delete('/:sku', controller.deleteOne);

export default route;
