import { productInMemoryRepositorySingleton } from '../add-product'
import { FindProductController } from './find-product-controller'
import { FindProductBySkuUseCase } from './find-product-use-case'

const findProductBySkuRepository = productInMemoryRepositorySingleton

const findProductBySkuUseCase = new FindProductBySkuUseCase(findProductBySkuRepository)
const findProductController = new FindProductController(findProductBySkuUseCase)

export { findProductController }
