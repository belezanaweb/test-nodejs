const router = require('express').Router()
const controller = require('controller/ProductController')

router.get('/', controller.list)
router.get('/:sku', controller.bySku)
router.post('/', controller.create)
router.put('/:sku', controller.update)
router.put('/', controller.upsert)
router.patch('/:sku', controller.patch)
router.delete('/:sku', controller.delete)


module.exports = router
