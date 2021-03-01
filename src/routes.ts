import express from 'express'

import ProductsController from './controllers/productsController'

const router = express.Router()

router.get('/product/:sku', ProductsController.get)
router.put('/product/:sku', ProductsController.set)
router.delete('/product/:sku', ProductsController.delete)
router.post('/product', ProductsController.add)

export default router
