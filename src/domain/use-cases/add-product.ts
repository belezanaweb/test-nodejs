import { Either } from '../../core/either'
import { ProductAlreadyExistsError } from '../errors/product-already-exists'
import { ProductModel } from '../models/product'
import { WarehouseModel } from '../models/warehouse'

export type AddProductDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: WarehouseModel[]
  }
}

export interface AddProduct {
  add(productData: AddProductDTO): Promise<Either<ProductAlreadyExistsError, ProductModel>>
}
