import { Either } from '../../core/either'
import { ProductNotFoundError } from '../errors/product-not-found'
import { ProductModel } from '../models/product'
import { WarehouseModel } from '../models/warehouse'

export type EditProductDTO = {
  sku: number
  name: string
  warehouses: WarehouseModel[]
}

export interface IEditProductUseCase {
  execute({ sku, name, warehouses }: EditProductDTO): Promise<Either<ProductNotFoundError, ProductModel>>
}
