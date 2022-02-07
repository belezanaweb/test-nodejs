import { getProductByIdController } from '@/main/factories/controllers/get-product-by-id-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/product/:productId', getProductByIdController)
}
