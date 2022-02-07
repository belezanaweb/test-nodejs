import { IProductModel } from '@/domain/models/product-model'
import { Product } from '@/infra/adapters/typeorm/entities/product'
import { inventoryMapToModel } from './inventory-mapper'

export const productMapToModel = (entity: Product): IProductModel => {
  return {
    sku: entity.productCode,
    name: entity.name,
    inventory: entity.inventory ? inventoryMapToModel(entity.inventory) : undefined,
    isMarketable: true // Calculado!
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
