import { productsInMemoryRepository } from '../../../repositories/implementations';

import DeleteProductController from './DeleteProductController';
import DeleteProductUseCase from './DeleteProductUseCase';

const deleteProductUseCase = new DeleteProductUseCase(productsInMemoryRepository, productsInMemoryRepository);
const deleteProductController = new DeleteProductController(deleteProductUseCase);

export default deleteProductController;
