import express, { Application } from 'express';
import bodyParser from 'body-parser';
import IProductDataAccess from './domain/data_access/product.dataAccess.interface';
import ProductInMemoryDataAccess from './infrastructure/data_access/productInMemory.dataAccess';
import ProductUseCase from './application/use_cases/product.useCase';
import ProductHttpController from './infrastructure/http/product.httpController';
import productRouter from './infrastructure/routes/product.routes';

const app: Application = express();

app.use(bodyParser.json());

const productDataAccess: IProductDataAccess = new ProductInMemoryDataAccess();
const productUseCase = new ProductUseCase(productDataAccess);
const productHttpController = new ProductHttpController(productUseCase);

app.use('/products', productRouter(productHttpController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
