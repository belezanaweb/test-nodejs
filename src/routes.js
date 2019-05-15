const Router = require('koa-router')
const services = require('./services')
const validators = require('./validators')

const { health, product } = services
const { productValidator } = validators

const createRouter = () => {
  const router = new Router()

  router.get('/health', health.get)
  router.get('/product/:sku', product.get)
  router.post('/product', productValidator, product.save)
  router.put('/product/:sku', productValidator, product.update)
  router.delete('/product/:sku', product.remove)

  return router
}

module.exports = createRouter().routes()
