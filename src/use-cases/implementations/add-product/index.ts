import { ProductInMemoryRepository } from '../../../repositories/implementations/product-in-memory-repository'
import { AddProductController } from './add-product-controller'
import { AddProductUseCase } from './add-product-use-case'

const findProductBySkuRepository = new ProductInMemoryRepository()
const createProductRepository = new ProductInMemoryRepository()

const addProductUseCase = new AddProductUseCase(findProductBySkuRepository, createProductRepository)
const addProductController = new AddProductController(addProductUseCase)

export { addProductController }
