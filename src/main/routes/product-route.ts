import { deleteProductByIdController } from '@/main/factories/controllers/delete-product-by-id-controller-factory'
import { getProductByIdController } from '@/main/factories/controllers/get-product-by-id-controller-factory'
import { postProductController } from '@/main/factories/controllers/post-product-controller-factory'
import { putProductController } from '@/main/factories/controllers/put-product-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/products')
  router.get('/products/:productId', getProductByIdController)
  router.post('/products', postProductController)
  router.put('/products/:productId', putProductController)
  router.delete('/products/:productId', deleteProductByIdController)
}
