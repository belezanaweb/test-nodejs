//
// Setup API
//
const router = require('express').Router()
const controller = require('./controllers')
const validation = require('./validations')
const handler = require('integrations/express/handler')

router.post('/', validation.validate, handler(controller, 'post'))
router.put('/:sku', validation.validate, handler(controller, 'put'))
router.get('/:sku', handler(controller, 'getBySku'))
router.delete('/:sku', handler(controller, 'del'))

module.exports = router
