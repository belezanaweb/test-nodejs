import { ProductRepository } from "../../../repositories/implementations/product/product.repository";
import { ProductFindApp } from "./product-find.app";
import { ProductFindController } from "./product-find.controller";

const productDatabaseRepository = new ProductRepository();
const productFindApp = new ProductFindApp(productDatabaseRepository);
const productFindController = new ProductFindController(productFindApp);

export { productFindApp, productFindController }
