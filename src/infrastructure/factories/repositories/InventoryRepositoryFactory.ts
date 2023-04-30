import { PrismaClient } from "@prisma/client";
import {InventoryRepository, IInventoryRepository} from "src/domain/repositories/InventoryRepository";

export default class ProductRepositoryFactory {
  private static repository: IInventoryRepository;

  static async make(prismaClient: PrismaClient): Promise<IInventoryRepository> {
    if(this.repository) {
      return this.repository;
    }

    this.repository = new InventoryRepository(prismaClient);
    return this.repository;
  }
}
