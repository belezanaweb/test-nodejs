import { ProductRepository } from "../../../repositories/implementations/product/product.repository";
import { WarehouseRepository } from "../../../repositories/implementations/warehouse/warehouse.repository";
import { ProductUpdateApp } from "./product-update.app";
import { ProductUpdateController } from "./product-update.controller";

const productDatabaseRepository = new ProductRepository();
const warehouseRepositoryDatabase = new WarehouseRepository();

const productUpdateApp = new ProductUpdateApp(
  productDatabaseRepository,
  warehouseRepositoryDatabase
);

const productUpdateController = new ProductUpdateController(productUpdateApp);

export { productUpdateController, productUpdateApp }
