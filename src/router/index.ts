import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.post('/product', productController.create);
router.get('/product/:sku', productController.get);
router.put('/product/:sku', productController.update);
router.delete('/product/:sku', productController.delete);

export { router };
