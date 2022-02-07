import { getProductByIdController } from '@/main/factories/controllers/get-product-by-id-controller-factory'
import { postProductController } from '@/main/factories/controllers/post-product-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/product/:productId', getProductByIdController)
  router.post('/product', postProductController)
}
