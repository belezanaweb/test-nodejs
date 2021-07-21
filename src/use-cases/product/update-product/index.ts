import { productsInMemoryRepository } from '../../../repositories/implementations';

import UpdateProductController from './UpdateProductController';
import UpdateProductUseCase from './UpdateProductUseCase';

const updateProductUseCase = new UpdateProductUseCase(productsInMemoryRepository, productsInMemoryRepository);
const updateProductController = new UpdateProductController(updateProductUseCase);

export default updateProductController;
