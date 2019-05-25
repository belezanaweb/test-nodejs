const router = require('express').Router()


router.get('/', (request, response) => {
  response.send('PONG')
})
router.use('/products', require('./products'))
router.use('/health', require('./health'))

module.exports = router
