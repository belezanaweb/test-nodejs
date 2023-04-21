import { Router } from "express"
import { CreateProductController } from "../../modules/products/useCases/createProduct/CreateProductController"
import { GetProductController } from "../../modules/products/useCases/getProduct/GetProductController"
import { UpdateProductController } from "../../modules/products/useCases/updateProduct/UpdateProductController"
import { DeleteProductController } from "../../modules/products/useCases/deleteProduct/DeleteProductController"

const createProductController = new CreateProductController()
const getProductController = new GetProductController()
const updateProductController = new UpdateProductController()
const deleteProductController = new DeleteProductController()

const router = Router()
router.post('/', createProductController.handle)
router.get('/:sku', getProductController.handle)
router.put('/:sku', updateProductController.handle)
router.delete('/:sku', deleteProductController.handle)

export default router