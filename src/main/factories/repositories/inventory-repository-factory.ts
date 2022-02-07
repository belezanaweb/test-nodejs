import { InventoryRepository } from '@/infra/adapters/typeorm/repository/inventory-repository'

const makeInventoryRepository = (): InventoryRepository => {
  return new InventoryRepository()
}

export const inventoryRepository = makeInventoryRepository()
