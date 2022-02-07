import { CreateProduct } from '@/data/use-cases/create-product'
import { ICreateProduct } from '@/domain/protocols/create-product-protocol'
import { inventoryRepository } from '@/main/factories/repositories/inventory-repository-factory'
import { productRepository } from '@/main/factories/repositories/product-repository-factory'
import { warehouseRepository } from '@/main/factories/repositories/warehouse-repository-factory'

const makeCreateProduct = (): ICreateProduct => {
  return new CreateProduct(productRepository, warehouseRepository, inventoryRepository)
}

export const createProduct = makeCreateProduct()
