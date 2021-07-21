import { productsInMemoryRepository } from '../../../repositories/implementations';

import GetProductController from './GetProductController';
import GetProductUseCase from './GetProductUseCase';

const getProductUseCase = new GetProductUseCase(productsInMemoryRepository);
const getProductController = new GetProductController(getProductUseCase);

export default getProductController;
