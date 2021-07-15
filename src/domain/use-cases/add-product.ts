import { Either } from '../../core/either'
import { ProductAlreadyExistsError } from '../errors/product-already-exists'
import { ProductModel } from '../models/product'
import { WarehouseModel } from '../models/warehouse'

export type AddProductDTO = {
  sku: number
  name: string
  warehouses: WarehouseModel[]
}

export interface AddProduct {
  execute({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, ProductModel>>
}
