import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { updateProductById } from '@/main/factories/use-cases/update-product-factory'
import { PutProductController } from '@/presentation/controllers/put-product-controller'
import { IController } from '@/presentation/protocols'
import { putProductInventoryValidation, putProductValidation, putProductWarehouseValidation } from './put-product-validation-factory'

const makePutProductController = (): IController => {
  return new PutProductController(putProductValidation, putProductInventoryValidation, putProductWarehouseValidation, updateProductById)
}

export const putProductController = adaptRoute(makePutProductController())
