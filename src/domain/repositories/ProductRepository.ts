import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

import BadRequestError from "../exceptions/BadRequestError";
import NotFoundError from "../exceptions/NotFoundError";

export interface ProductRaw {
  productId: string;
  sku: number;
  name: string;
  inventory: InventoryRaw;
}

interface InventoryRaw {
  inventoryId: string;
  warehouse: WarehouesesRaw[];
}

interface WarehouesesRaw {
  warehouseId: string;
  locality: string;
  quantity: number;
  type: string;
}

export interface IProductRepository {
  create(name: string, sku: number): Promise<string>;
  getBySky(sku: number): Promise<ProductRaw>;
  delete(sku: number): Promise<void>;
}

export class ProductRepository implements IProductRepository{
  constructor(private prismaClient: PrismaClient) {}

  async getBySky(sku: number): Promise<ProductRaw> {
    const product = await this.prismaClient.product.findUnique({
      where: {sku},
      select: {
        productId: true,
        sku: true,
        name: true,
        inventory: {
          select: {
            inventoryId: true,
            warehouse: {
              select: {
                warehouseId: true,
                locality: true,
                quantity: true,
                type: true,
              }
            }
          }
        }
      }
    });

    if(!product) {
      throw new NotFoundError(`The product with sku ${sku} is not found`);
    }

    return product as ProductRaw;
  }

  async create(name: string, sku: number): Promise<string> {
    const findProduct = await this.prismaClient.product.findUnique({
      where: {sku},
    });

    if(findProduct) {
      throw new BadRequestError(`The product with sku: ${sku} already exists.`);
    }

    const newProduct = await this.prismaClient.product.create({
      data: {
        productId: uuidv4(),
        sku: sku,
        name: name,
      },
    })

    return newProduct.productId;
  }

  async delete(sku: number): Promise<void> {
    await this.getBySky(sku);
    await this.prismaClient.product.delete({
      where: {sku}
    })
  }
}
