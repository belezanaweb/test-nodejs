import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/:sku', productsController.find)
productsRouter.post('/', productsController.create)
productsRouter.patch('/:sku', productsController.update)
productsRouter.delete('/:sku', productsController.delete)

export default productsRouter;
