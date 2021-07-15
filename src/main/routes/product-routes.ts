import { Router } from 'express'
import { addProductController } from '../../use-cases/implementations/add-product'
import { adaptRoute } from '../adapters/express/express-route-adapter'

const productRouter = Router()

productRouter.post('/', adaptRoute(addProductController))

export { productRouter }
