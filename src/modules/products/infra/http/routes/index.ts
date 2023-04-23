import { Router } from 'express';
import { celebrate } from 'celebrate';

import ProductController from '../controllers/ProductController';
import { skuProduct, createProduct, updateProduct } from './schema';

const productRoute = Router();

productRoute.get('/:sku', celebrate(skuProduct), ProductController.find);
productRoute.post('/', celebrate(createProduct), ProductController.create);
productRoute.put('/:sku', celebrate(updateProduct), ProductController.update);
productRoute.delete('/:sku', celebrate(skuProduct), ProductController.delete);

export default productRoute;
