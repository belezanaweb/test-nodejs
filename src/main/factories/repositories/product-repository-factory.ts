import { ProductRepository } from '@/infra/adapters/typeorm/repository/product-repository'

const makeProductRepository = (): ProductRepository => {
  return new ProductRepository()
}

export const productRepository = makeProductRepository()
