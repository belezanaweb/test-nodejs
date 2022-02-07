import { IInventoryModel } from '@/domain/models/inventory-model'

export interface IDbFindInventories {
  findAll: () => Promise<IInventoryModel[] | []>
}

export interface IDbFindInventoryById {
  findById: (inventoryId: number) => Promise<IInventoryModel | undefined>
}
