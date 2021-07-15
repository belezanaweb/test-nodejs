import { Router } from 'express'
import { addProductController } from '../../use-cases/implementations/add-product'
import { editProductController } from '../../use-cases/implementations/edit-product'
import { adaptRoute } from '../adapters/express/express-route-adapter'

const productRouter = Router()

productRouter.post('/', adaptRoute(addProductController))
productRouter.put('/:sku', adaptRoute(editProductController))

export { productRouter }
