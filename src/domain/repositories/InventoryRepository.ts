import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export interface IInventoryRepository {
  create(productId: string): Promise<string>;
}

export class InventoryRepository implements IInventoryRepository {
  constructor(private prismaClient: PrismaClient) {}

  async create(productId: string): Promise<string> {
    const newInventory = await this.prismaClient.inventory.create({
      data: {
        inventoryId: uuidv4(),
        productId,
      }
    })

    return newInventory.inventoryId;
  }
}
