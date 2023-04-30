import { Router } from 'express';
import ProductHttpController from '../http/product.httpController';

const productRouter = (productHttpController: ProductHttpController): Router => {
  const router = Router();

  router.post('/', (req, res) => {
    productHttpController.createProduct(req, res);
  });

  router.put('/:sku', (req, res) => {
    productHttpController.updateProduct(req, res);
  });

  router.get('/:sku', (req, res) => {
    productHttpController.getProduct(req, res);
  });

  router.delete('/:sku', (req, res) => {
    productHttpController.deleteProduct(req, res);
  });

  return router;
};

export default productRouter;
