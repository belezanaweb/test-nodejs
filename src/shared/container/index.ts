import { container } from 'tsyringe';

import ProductsRepository from '@modules/products/repositories/ProductRepository';
import InMemoryProductsRepository from '@modules/products/infra/repositories/InMemoryProductsRepository';

container.registerSingleton<ProductsRepository>(
  'ProductsRepository',
  InMemoryProductsRepository,
);

