import { Router } from 'express';
import { expressYupMiddleware } from 'express-yup-middleware'
import productCreateSchema from '../schemas/product-schema-post';
import productUpdateSchema from '../schemas/product-schema-put';
import validatorSchema from '../middlewares/validate-schema';
import { create, update, remove, get } from '../controllers/products.controller';

const productRouter = Router()

productRouter.post('/', validatorSchema(productCreateSchema), create);
productRouter.put('/:sku',validatorSchema(productUpdateSchema), update);
productRouter.get('/:sku', get);
productRouter.delete('/:sku', remove);

export default productRouter;

