import { FindProductById } from '@/data/use-cases/find-product-by-id'
import { IFindProductById } from '@/domain/protocols/find-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'
import { calculateProductAttributes } from './calculate-product-attributes-factory'

const makeFindProductById = (): IFindProductById => {
  return new FindProductById(productJsonRepository, calculateProductAttributes)
}

export const findProductById = makeFindProductById()
