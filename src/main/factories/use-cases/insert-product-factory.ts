import { InsertProduct } from '@/data/use-cases/insert-product'
import { IInsertProduct } from '@/domain/protocols/insert-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'
import { calculateProductAttributes } from './calculate-product-attributes-factory'

const makeInsertProduct = (): IInsertProduct => {
  return new InsertProduct(productJsonRepository, calculateProductAttributes)
}

export const insertProduct = makeInsertProduct()
