import { DeleteProductById } from '@/data/use-cases/delete-product-by-id'
import { IDeleteProductById } from '@/domain/protocols/delete-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'

const makeDeleteProductById = (): IDeleteProductById => {
  return new DeleteProductById(productJsonRepository)
}

export const deleteProductById = makeDeleteProductById()
