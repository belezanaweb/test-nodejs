import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { deleteProductById } from '@/main/factories/use-cases/delete-product-by-id-factory'
import { DeleteProductByIdController } from '@/presentation/controllers/delete-product-by-id-controller'
import { IController } from '@/presentation/protocols'
import { deleteProductByIdValidation } from './delete-product-by-id-validation-factory'

const makeDeleteProductByIdController = (): IController => {
  return new DeleteProductByIdController(deleteProductByIdValidation, deleteProductById)
}

export const deleteProductByIdController = adaptRoute(makeDeleteProductByIdController())
