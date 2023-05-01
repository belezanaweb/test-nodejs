import { PrismaClient } from "@prisma/client";
import {IWarehouseRepository, WarehouseRepository} from "../../../domain/repositories/WarehouseRepository";

export default class WarehouseRepositoryFactory {
  private static repository: IWarehouseRepository;

  static async make(prismaClient: PrismaClient): Promise<IWarehouseRepository> {
    if(this.repository) {
      return this.repository;
    }

    this.repository = new WarehouseRepository(prismaClient);
    return this.repository;
  }
}
