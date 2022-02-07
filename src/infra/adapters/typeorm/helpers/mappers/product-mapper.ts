import { IProductModel } from '@/domain/models/product-model'
import { Product } from '@/infra/adapters/typeorm/entities/product'
import { warehouseMapToModel } from './warehouse-mapper'

export const productMapToModel = (entity: Product): IProductModel => {
  const totalQuantity = entity.inventory ? entity.inventory?.map(item => item.quantity).reduce((acc, item) => item + acc) : 0
  return {
    sku: entity.productCode,
    name: entity.name,
    inventory: {
      quantity: totalQuantity, // Calculado!
      warehouses: entity.inventory ? entity.inventory?.map(item => { return warehouseMapToModel(item.warehouse, item.quantity) }) : []
    },
    isMarketable: totalQuantity > 0 // Calculado!
  }
}

export const productsMapToModel = (arrayEntity: Product[]): IProductModel[] => {
  const arrayModel: IProductModel[] = []
  for (const item of arrayEntity) {
    arrayModel.push(productMapToModel(item))
  }
  return arrayModel
}

export const productMapToEntity = (model: IProductModel): Product => {
  const entity: Product = new Product()
  entity.productCode = model.sku
  entity.name = model.name
  return entity
}

export const productsMapToEntity = (arrayModel: IProductModel[]): Product[] => {
  const arrayEntity: Product[] = []
  for (const item of arrayModel) {
    arrayEntity.push(productMapToEntity(item))
  }
  return arrayEntity
}
