import { ProductRepository } from "../../../repositories/implementations/product/product.repository";
import { ProductGetAPP } from "./product-get.app";
import { ProductGetController } from "./product-get.controller";

const productDatabaseRepository = new ProductRepository();
const productGetApp = new ProductGetAPP(productDatabaseRepository);
const productGetController = new ProductGetController(productGetApp);

export { productGetApp, productGetController }
