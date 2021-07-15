import { Either } from '../../core/either'
import { ProductAlreadyExistsError } from '../errors/product-already-exists'
import { WarehouseModel } from '../models/warehouse'

export type AddProductDTO = {
  sku: number
  name: string
  warehouses: WarehouseModel[]
}

export type CreatedProduct = {
  sku: number
  name: string
  inventory: {
    warehouses: WarehouseModel[]
  }
}

export interface AddProduct {
  execute({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, CreatedProduct>>
}
