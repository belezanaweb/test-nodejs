import express from 'express';
import { Container } from 'typedi';
import { ProductController } from '../controller/product-controller';
import { ValidationUtils } from '../utils';
import { ProductSchema } from './schemas/product-schema';

class ProductRouter {

    public router: express.Router;

    constructor() {
        this.router = express.Router();
        const controller = Container.get(ProductController);

        this.router.post('/products',
            ValidationUtils.validate(ProductSchema.POST_PRODUCT), 
            (req, res, next) => controller.postProduct(req, res, next));  

        this.router.put('/products/:sku',
            ValidationUtils.validate(ProductSchema.PUT_PRODUCT), 
            (req, res, next) => controller.putProduct(req, res, next));  

        this.router.get('/products/:sku',
            ValidationUtils.validate(ProductSchema.GET_PRODUCT), 
            (req, res, next) => controller.getProduct(req, res, next));  

        this.router.delete('/products/:sku',
            ValidationUtils.validate(ProductSchema.DELETE_PRODUCT), 
            (req, res, next) => controller.deleteProduct(req, res, next));  

    }
    
}

export default new ProductRouter().router;