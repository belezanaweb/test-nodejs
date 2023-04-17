import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductInventoryWarehouses } from "../../dtos/ProductRequest.dto";
import { IProductWarehouseRepository } from "../IProductWarehouseRepository";
import { ProductWarehouse } from "../../entities/product_warehouses.entity";

export class ProductWarehouseRepository implements IProductWarehouseRepository {
  constructor(
    @InjectRepository(ProductWarehouse)
    private readonly repository: Repository<ProductWarehouse>
  ) {}

  findByProductSku(productSku: number): Promise<ProductWarehouse> {
    return this.repository.findOne({
      where: {
        product_sku: productSku,
      },
    });
  }

  async createMany(
    producSku: number,
    dto: ProductInventoryWarehouses[]
  ): Promise<ProductWarehouse[]> {
    if (!dto.length) return [];

    const warehouse = await this.repository.create(
      dto.map((item) => ({
        locality: item.locality,
        product_sku: producSku,
        quantity: item.quantity,
        type: item.type,
      }))
    );

    return this.repository.save(warehouse);
  }

  async delete(sku: number): Promise<boolean> {
    await this.repository.delete({
      product_sku: sku,
    });

    return true;
  }
}
