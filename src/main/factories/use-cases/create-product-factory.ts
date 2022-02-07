import { CreateProduct } from '@/data/use-cases/create-product'
import { ICreateProduct } from '@/domain/protocols/create-product-protocol'
import { productRepository } from '@/main/factories/repositories/product-repository-factory'

const makeCreateProduct = (): ICreateProduct => {
  return new CreateProduct(productRepository)
}

export const createProduct = makeCreateProduct()
