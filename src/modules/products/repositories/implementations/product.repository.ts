import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IProductRepository } from "../IProductRepository";
import { ProductRequest } from "../../dtos/ProductRequest.dto";

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  findBySku(sku: number): Promise<Product> {
    return this.repository.findOne({
      where: {
        sku,
      },
      relations: ["warehouses"],
    });
  }

  async create(dto: ProductRequest): Promise<Product> {
    const product = new Product();
    product.sku = dto.sku;
    product.name = dto.name;

    return this.repository.save(product);
  }

  async update(dto: ProductRequest): Promise<Product> {
    await this.repository.update(
      {
        sku: dto.sku,
      },
      {
        name: dto.name,
      }
    );

    return this.findBySku(dto.sku);
  }

  async delete(sku: number): Promise<boolean> {
    await this.repository.delete({
      sku: sku,
    });

    return true;
  }
}
