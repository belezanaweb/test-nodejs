import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

import Warehouse from "../entities/Warehouse";

export interface IWarehouseRepository {
  create(warehouses: Warehouse[], inventoryId: string): Promise<void>;
}

export class WarehouseRepository implements IWarehouseRepository{
  constructor(private prismaClient: PrismaClient) {}

  async create(warehouses: Warehouse[], inventoryId: string): Promise<void> {
    const warehouseDate = warehouses.map(warehouse => {
      return {
        warehouseId: uuidv4(),
        locality: warehouse.locality,
        quantity: warehouse.quantity,
        type: warehouse.type,
        inventoryId,
      }
    });

    this.prismaClient.warehouse.createMany({
      data: warehouseDate
    });
  }
}
