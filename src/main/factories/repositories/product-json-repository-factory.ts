import { ProductJsonRepository } from '@/infra/adapters/typeorm/repository/product-json-repository'

const makeProductJsonRepository = (): ProductJsonRepository => {
  return new ProductJsonRepository()
}

export const productJsonRepository = makeProductJsonRepository()
