import { CheckStatusController } from './controllers/CheckStatus.controller'
import { CatalogController } from './controllers/Catalog.controller'
import { Router } from 'express'
import { responseHandler } from './middlewares/index'

const router = Router()

router.get('/v1/checkstatus', CheckStatusController.get)

router.post('/v1/catalog', CatalogController.create)

router.get('/v1/catalog/:sku', CatalogController.get)

router.put('/v1/catalog/:sku', CatalogController.update)

router.delete('/v1/catalog/:sku', CatalogController.remove)




router.use(responseHandler)

export { router }