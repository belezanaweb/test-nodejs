import { ProductRepository } from "../../../repositories/implementations/product/product.repository";
import { ProductDeleteApp } from "./product-delete.app";
import { ProductDeleteController } from "./product-delete.controller";

const productDatabaseRepository = new ProductRepository();
const productDeleteApp = new ProductDeleteApp(productDatabaseRepository);
const productDeleteController = new ProductDeleteController(productDeleteApp);

export { productDeleteApp, productDeleteController }
