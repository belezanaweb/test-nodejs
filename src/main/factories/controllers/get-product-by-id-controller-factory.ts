import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { findProductById } from '@/main/factories/use-cases/find-product-by-id-factory'
import { GetProductByIdController } from '@/presentation/controllers/get-product-by-id-controller'
import { IController } from '@/presentation/protocols'

const makeGetProductByIdController = (): IController => {
  return new GetProductByIdController(undefined, findProductById)
}

export const getProductByIdController = adaptRoute(makeGetProductByIdController())
