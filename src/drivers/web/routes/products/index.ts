import { Router } from 'express';
import CreateProduct from 'src/application/use_cases/CreateProduct';
import DeleteProduct from 'src/application/use_cases/DeleteProduct';
import GetProduct from 'src/application/use_cases/GetProduct';
import UpdateProduct from 'src/application/use_cases/UpdateProduct';
import CreateProductController from 'src/interface_adapters/controllers/CreateProductController';
import DeleteProductController from 'src/interface_adapters/controllers/DeleteProductController';
import GetProductController from 'src/interface_adapters/controllers/GetProductController';
import UpdateProductController from 'src/interface_adapters/controllers/UpdateProductController';
import ProductRepositoryMemory from 'src/interface_adapters/repositories/memory/ProductRepositoryMemory';

const router = Router();
const productRepository = new ProductRepositoryMemory();
const getProductController = new GetProductController({
  getProduct: new GetProduct({
    productRepository
  })
});
const createProductController = new CreateProductController({
  createProduct: new CreateProduct({
    productRepository
  })
});
const deleteProductController = new DeleteProductController({
  deleteProduct: new DeleteProduct({
    productRepository
  })
})
const updateProductController = new UpdateProductController({
  updateProduct: new UpdateProduct({
    productRepository
  })
})
router.get("/:sku", async (req, res) => getProductController.handle(req, res));
router.post("/", async (req, res) => createProductController.handle(req, res));
router.delete("/:sku", async (req, res) => deleteProductController.handle(req, res));
router.put("/", async (req, res) => updateProductController.handle(req, res));

export default router;
