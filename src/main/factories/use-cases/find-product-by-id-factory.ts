import { FindProductById } from '@/data/use-cases/find-product-by-id'
import { IFindProductById } from '@/domain/protocols/find-product-by-id-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'

const makeFindProductById = (): IFindProductById => {
  return new FindProductById(productJsonRepository)
}

export const findProductById = makeFindProductById()
