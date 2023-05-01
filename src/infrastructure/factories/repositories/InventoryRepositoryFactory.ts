import { PrismaClient } from "@prisma/client";
import {InventoryRepository, IInventoryRepository} from "../../../domain/repositories/InventoryRepository";

export default class InventoryRepositoryFactory {
  private static repository: IInventoryRepository;

  static async make(prismaClient: PrismaClient): Promise<IInventoryRepository> {
    if(this.repository) {
      return this.repository;
    }

    this.repository = new InventoryRepository(prismaClient);
    return this.repository;
  }
}
