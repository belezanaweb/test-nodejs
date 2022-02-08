import { FindProducts } from '@/data/use-cases/find-products'
import { IFindProducts } from '@/domain/protocols/find-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'
import { calculateProductAttributes } from './calculate-product-attributes-factory'

const makeFindProducts = (): IFindProducts => {
  return new FindProducts(productJsonRepository, calculateProductAttributes)
}

export const findProducts = makeFindProducts()
