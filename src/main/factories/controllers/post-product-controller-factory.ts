import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { createProduct } from '@/main/factories/use-cases/create-product-factory'
import { PostProductController } from '@/presentation/controllers/post-product-controller'
import { IController } from '@/presentation/protocols'
import { postProductInventoryValidation, postProductValidation, postProductWarehouseValidation } from './post-product-validation-factory'

const makePostProductController = (): IController => {
  return new PostProductController(postProductValidation, postProductInventoryValidation, postProductWarehouseValidation, createProduct)
}

export const postProductController = adaptRoute(makePostProductController())
