import {Router} from 'express' ;
const routes = new Router();

import ProductController from '../modules/products/controller/ProductController'

const productController = new ProductController()

routes.post("/products",  productController.create);
routes.get("/products/:sku", productController.fetch);


export default routes;