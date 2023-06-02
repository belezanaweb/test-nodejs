const { addProductsRouter, deleteProductsBySkuRouter, getProductsBySkuRouter, updateProductsBySkuRouter } = require('../../factories/presentation/products-presentation-factory')
const ExpressRouterAdapter = require('../../adapters/express-router-adapter')

module.exports = (router) => {
  router.get('/products/:sku', ExpressRouterAdapter.adapt(getProductsBySkuRouter))
  router.post('/products', ExpressRouterAdapter.adapt(addProductsRouter))
  router.put('/products/:sku', ExpressRouterAdapter.adapt(updateProductsBySkuRouter))
  router.delete('/products/:sku', ExpressRouterAdapter.adapt(deleteProductsBySkuRouter))
}
