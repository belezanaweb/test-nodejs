import { ProductRepository } from "../../../repositories/implementations/product/product.repository";
import { WarehouseRepository } from "../../../repositories/implementations/warehouse/warehouse.repository";
import { ProductCreateApp } from "./product-create.app";
import { ProductCreateController } from "./product-create.controller";

const productDatabaseRepository = new ProductRepository();
const warehouseRepositoryDatabase = new WarehouseRepository();

const productCreateApp = new ProductCreateApp(
  productDatabaseRepository,
  warehouseRepositoryDatabase
);
const productCreateController = new ProductCreateController(productCreateApp);

export { productCreateController, productCreateApp };
