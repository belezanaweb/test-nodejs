import { IDbFindInventories, IDbFindInventoryById } from '@/data/protocols/db-find-inventory-protocol'
import { IInventoryModel } from '@/domain/models/inventory-model'
import { Inventory } from '@/infra/adapters/typeorm/entities/inventory'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class InventoryRepository extends TypeORMRepository implements IDbFindInventories, IDbFindInventoryById {
  private getInventoryRepo (): Repository<Inventory> {
    return this.getRepository(Inventory)
  }

  async findAll (): Promise<IInventoryModel[] | undefined> {
    const inventories = await this.getInventoryRepo().find()
    console.log(inventories)
    return []
  }

  async findById (inventoryId: number): Promise<IInventoryModel | undefined> {
    const inventory = await this.getInventoryRepo().findOne({ inventoryCode: inventoryId })
    console.log(inventory)
    return undefined
  }
}
