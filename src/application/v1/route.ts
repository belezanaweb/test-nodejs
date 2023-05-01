import { PrismaClient } from "@prisma/client";


import { Router } from "../Controller";
import InventoryRepositoryFactory from "../../infrastructure/factories/repositories/InventoryRepositoryFactory";
import WarehouseRepositoryFactory from "../../infrastructure/factories/repositories/WarehouseRepositoryFactory";
import ProductServiceFactory from "../../infrastructure/factories/service/ProductServiceFactory";
import ProductRepositoryFactory from "../../infrastructure/factories/repositories/ProductRepositoryFactory";
import CreateProductControllerFactory from "../../infrastructure/factories/controller/CreateProductControllerFactory";
import GetOneProductControllerFactory from "../../infrastructure/factories/controller/GetOneProductControllerFactory";
import DeleteProductControllerFactory from "../../infrastructure/factories/controller/DeleteProductControllerFactory";
import UpdateProductControllerFactory from "../../infrastructure/factories/controller/UpdateProductControllerFactory";

const routerV1 = async (): Promise<Router> => {
  const prismaClient = new PrismaClient();

  const productRepository = await ProductRepositoryFactory.make(prismaClient);
  const inventoryRepository = await InventoryRepositoryFactory.make(prismaClient);
  const warehouseRepository = await WarehouseRepositoryFactory.make(prismaClient);

  const productService = await ProductServiceFactory.make(productRepository, inventoryRepository, warehouseRepository);

  return {
    prefix: '/product/v1',
    controllers: [
      await CreateProductControllerFactory.make(productService),
      await GetOneProductControllerFactory.make(productService),
      await DeleteProductControllerFactory.make(productService),
      await UpdateProductControllerFactory.make(productService),
    ],
  }
}

export default routerV1;
