import { IInventoryModel } from '@/domain/models/inventory-model'
import { Inventory } from '@/infra/adapters/typeorm/entities/inventory'

export const inventoryMapToModel = (entity: Inventory): IInventoryModel => {
  return {
    quantity: entity.quantity,
    warehouses: undefined
  }
}

export const inventoriesMapToModel = (arrayEntity: Inventory[]): IInventoryModel[] => {
  const arrayModel: IInventoryModel[] = []
  for (const item of arrayEntity) {
    arrayModel.push(inventoryMapToModel(item))
  }
  return arrayModel
}

export const inventoryMapToEntity = (model: IInventoryModel): Inventory => {
  const entity: Inventory = new Inventory()
  entity.inventoryCode = undefined
  entity.quantity = model.quantity
  // entity.warehouse = model.warehouses ? model.warehouses[0] : undefined
  // entity.product = model.
  return entity
}

export const inventoriesMapToEntity = (arrayModel: IInventoryModel[]): Inventory[] => {
  const arrayEntity: Inventory[] = []
  for (const item of arrayModel) {
    arrayEntity.push(inventoryMapToEntity(item))
  }
  return arrayEntity
}
