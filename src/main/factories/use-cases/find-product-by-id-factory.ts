import { FindProductById } from '@/data/use-cases/find-product-by-id'
import { IFindProductById } from '@/domain/protocols/find-product-by-id-protocol'
import { productRepository } from '@/main/factories/repositories/product-repository-factory'

const makeFindProductById = (): IFindProductById => {
  return new FindProductById(productRepository)
}

export const findProductById = makeFindProductById()
