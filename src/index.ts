import express, { Application } from "express";
import ProductUseCase from "./application/usecases/ProductUseCases";
import ProductsRepositoryI from "./infraestructure/repositories/ProductRepositoryInterface";
import ProductRepository from "./infraestructure/repositories/ProductRepository";
import routerProduct from "./infraestructure/routes";
import ProductController from "./interfaces/ProductController";

const app: Application = express();
const port = 3000;

app.use(express.json());

const productRepositoryI: ProductsRepositoryI = new ProductRepository();
const productUseCase = new ProductUseCase(productRepositoryI);
const productController = new ProductController(productUseCase);

app.use("/products", routerProduct(productController));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
