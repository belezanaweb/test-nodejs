import { makeProductController } from './product.factory';
import { Router } from 'express';
import { postValidator, putValidator, skuValidator } from './product.schema';

const router = Router();
const productController = makeProductController();

router.post('/', postValidator, productController.create.bind(productController));
router.get('/', productController.getAll.bind(productController));
router.get('/:sku', skuValidator, productController.getBySku.bind(productController));
router.delete('/:sku', skuValidator, productController.delete.bind(productController));
router.put('/:sku', putValidator, productController.update.bind(productController));

export default router;
