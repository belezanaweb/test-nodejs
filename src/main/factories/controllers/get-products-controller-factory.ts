import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { findProducts } from '@/main/factories/use-cases/find-products-factory'
import { GetProductsController } from '@/presentation/controllers/get-products-controller'
import { IController } from '@/presentation/protocols'

const makeGetProductsController = (): IController => {
  return new GetProductsController(findProducts)
}

export const getProductsController = adaptRoute(makeGetProductsController())
