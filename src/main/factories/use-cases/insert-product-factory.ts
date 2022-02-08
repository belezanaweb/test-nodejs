import { InsertProduct } from '@/data/use-cases/insert-product'
import { IInsertProduct } from '@/domain/protocols/insert-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'

const makeInsertProduct = (): IInsertProduct => {
  return new InsertProduct(productJsonRepository)
}

export const insertProduct = makeInsertProduct()
