import { productInMemoryRepositorySingleton } from '../add-product'
import { DeleteProductController } from './delete-product-controller'
import { DeleteProductBySkuUseCase } from './delete-product-use-case'

const findProductBySkuRepository = productInMemoryRepositorySingleton
const deleteProductBySkuRepository = productInMemoryRepositorySingleton

const deleteProductBySkuUseCase = new DeleteProductBySkuUseCase(findProductBySkuRepository, deleteProductBySkuRepository)
const deleteProductController = new DeleteProductController(deleteProductBySkuUseCase)

export { deleteProductController }
