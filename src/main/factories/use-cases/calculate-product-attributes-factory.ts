import { CalculateProductAttributes } from '@/data/use-cases/calculate-product-attributes'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'

const makeCalculateProductAttributes = (): ICalculateProductAttributes => {
  return new CalculateProductAttributes()
}

export const calculateProductAttributes = makeCalculateProductAttributes()
