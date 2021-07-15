import { productInMemoryRepositorySingleton } from '../add-product'
import { EditProductController } from './edit-product-controller'
import { EditProductUseCase } from './edit-product-use-case'

const findProductBySkuRepository = productInMemoryRepositorySingleton
const updateProductRepository = findProductBySkuRepository

const editProductUseCase = new EditProductUseCase(findProductBySkuRepository, updateProductRepository)
const editProductController = new EditProductController(editProductUseCase)

export { editProductController }
