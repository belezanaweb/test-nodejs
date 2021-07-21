import { productsInMemoryRepository } from '../../../repositories/implementations';

import CreateProductController from './CreateProductController';
import CreateProductUseCase from './CreateProductUseCase';

const createProductUseCase = new CreateProductUseCase(productsInMemoryRepository, productsInMemoryRepository);
const createProductController = new CreateProductController(createProductUseCase);

export default createProductController;
