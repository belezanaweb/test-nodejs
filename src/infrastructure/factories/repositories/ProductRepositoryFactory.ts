import { PrismaClient } from "@prisma/client";
import {IProductRepository, ProductRepository} from "../../../domain/repositories/ProductRepository";

export default class ProductRepositoryFactory {
  private static repository: IProductRepository;

  static async make(prismaClient: PrismaClient): Promise<IProductRepository> {
    if(this.repository) {
      return this.repository;
    }

    this.repository = new ProductRepository(prismaClient);
    return this.repository;
  }
}
