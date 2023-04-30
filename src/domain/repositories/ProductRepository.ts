import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import Product from "../entities/Product";

export interface IProductRepository {
  create(product: Product): Promise<string>;
}

export class ProductRepository implements IProductRepository{
  constructor(private prismaClient: PrismaClient) {}

  async create(product: Product): Promise<string> {
    const newProduct = await this.prismaClient.product.create({
      data: {
        productId: uuidv4(),
        sku: product.sku,
        name: product.name,
      }
    })

    return newProduct.productId;
  }
}
