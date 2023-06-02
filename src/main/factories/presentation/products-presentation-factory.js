const { AddProductsRouter, DeleteProductsBySkuRouter, GetProductsBySkuRouter, UpdateProductsBySkuRouter } = require('../../../presentation/routers/products')
const usecases = require('../usecases/products-usecase-factory')

module.exports = {
  addProductsRouter: new AddProductsRouter(usecases),
  deleteProductsBySkuRouter: new DeleteProductsBySkuRouter(usecases),
  getProductsBySkuRouter: new GetProductsBySkuRouter(usecases),
  updateProductsBySkuRouter: new UpdateProductsBySkuRouter(usecases)
}
