import { Module } from "@nestjs/common";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "./services/products.service";
import { ProductRepository } from "./repositories/implementations/product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductWarehouse } from "./entities/product_warehouses.entity";
import { ProductWarehouseRepository } from "./repositories/implementations/product_warehouse.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductWarehouse])],
  controllers: [ProductsController],
  providers: [
    { provide: "IProductRepository", useClass: ProductRepository },
    {
      provide: "IProductWarehouseRepository",
      useClass: ProductWarehouseRepository,
    },
    ProductsService,
  ],
})
export class ProuctsModule {}
