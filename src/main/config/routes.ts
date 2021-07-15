import { Express, Router } from 'express'
import { productRouter } from '../routes/product-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  router.use('/product', productRouter)
}
