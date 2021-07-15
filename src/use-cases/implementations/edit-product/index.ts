import { productInMemoryRepositorySingleton } from '../add-product'
import { EditProductController } from './edit-product-controller'
import { EditProductUseCase } from './edit-product-use-case'

const findProductBySkuRepository = productInMemoryRepositorySingleton
const updateProductRepository = productInMemoryRepositorySingleton

const editProductUseCase = new EditProductUseCase(findProductBySkuRepository, updateProductRepository)
const editProductController = new EditProductController(editProductUseCase)

export { editProductController }
