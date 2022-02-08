import { FindProducts } from '@/data/use-cases/find-products'
import { IFindProducts } from '@/domain/protocols/find-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'

const makeFindProducts = (): IFindProducts => {
  return new FindProducts(productJsonRepository)
}

export const findProducts = makeFindProducts()
