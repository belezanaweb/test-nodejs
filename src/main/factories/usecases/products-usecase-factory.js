const {
  AddProductsUsecase, DeleteProductsBySkuUsecase, GetProductsBySkuUsecase, UpdateProductsBySkuUsecase
} = require('../../../domain/products')

const { ProductsRepository } = require('../../../infra/db/memory')

const dependencies = {
  productsRepository: ProductsRepository
}

module.exports = {
  addProductsUseCase: new AddProductsUsecase(dependencies),
  deleteProductsBySkuUseCase: new DeleteProductsBySkuUsecase(dependencies),
  getProductsBySkuUseCase: new GetProductsBySkuUsecase(dependencies),
  updateProductsBySkuUseCase: new UpdateProductsBySkuUsecase(dependencies)
}
