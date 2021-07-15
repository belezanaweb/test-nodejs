import { productInMemoryRepositorySingleton } from '../../../repositories/implementations'
import { AddProductController } from './add-product-controller'
import { AddProductUseCase } from './add-product-use-case'

const findProductBySkuRepository = productInMemoryRepositorySingleton
const createProductRepository = productInMemoryRepositorySingleton

const addProductUseCase = new AddProductUseCase(findProductBySkuRepository, createProductRepository)
const addProductController = new AddProductController(addProductUseCase)

export { addProductController, productInMemoryRepositorySingleton }
