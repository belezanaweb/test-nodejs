import { productsInMemoryRepository } from '../../../repositories/implementations';

import GetAllProductsController from './GetAllProductsController';
import GetAllProductsUseCase from './GetAllProductsUseCase';

const getAllProductsUseCase = new GetAllProductsUseCase(productsInMemoryRepository);
const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);

export default getAllProductsController;
