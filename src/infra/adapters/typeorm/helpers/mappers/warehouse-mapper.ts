import { IWarehouseModel } from '@/domain/models/warehouse-model'
import { Warehouse } from '@/infra/adapters/typeorm/entities/warehouse'

export const warehouseMapToModel = (entity: Warehouse): IWarehouseModel => {
  return {
    locality: entity.locality,
    quantity: entity.inventory ? entity.inventory?.map(item => item.quantity).reduce((acc, item) => item + acc) : 0,
    type: entity.type
  }
}

export const warehousesMapToModel = (arrayEntity: Warehouse[]): IWarehouseModel[] => {
  const arrayModel: IWarehouseModel[] = []
  for (const item of arrayEntity) {
    arrayModel.push(warehouseMapToModel(item))
  }
  return arrayModel
}

export const warehouseMapToEntity = (model: IWarehouseModel): Warehouse => {
  const entity: Warehouse = new Warehouse()
  entity.locality = model.locality
  entity.type = model.type
  return entity
}

export const warehousesMapToEntity = (arrayModel: IWarehouseModel[]): Warehouse[] => {
  const arrayEntity: Warehouse[] = []
  for (const item of arrayModel) {
    arrayEntity.push(warehouseMapToEntity(item))
  }
  return arrayEntity
}
