import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { findProductById } from '@/main/factories/use-cases/find-product-by-id-factory'
import { GetProductByIdController } from '@/presentation/controllers/get-product-by-id-controller'
import { IController } from '@/presentation/protocols'
import { getProductByIdValidation } from './get-product-by-id-validation-factory'

const makeGetProductByIdController = (): IController => {
  return new GetProductByIdController(getProductByIdValidation, findProductById)
}

export const getProductByIdController = adaptRoute(makeGetProductByIdController())
