import { UpdateProductById } from '@/data/use-cases/update-product'
import { IUpdateProductById } from '@/domain/protocols/update-product-protocol'
import { productJsonRepository } from '@/main/factories/repositories/product-json-repository-factory'
import { calculateProductAttributes } from './calculate-product-attributes-factory'

const makeUpdateProductById = (): IUpdateProductById => {
  return new UpdateProductById(productJsonRepository, calculateProductAttributes)
}

export const updateProductById = makeUpdateProductById()
