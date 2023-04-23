import { container, delay } from 'tsyringe';

import { IProductRepo } from '../../../../modules/products/repo/IProductRepo';
import ProductRepository from '../../../../modules/products/infra/memoryRepo/ProductRepositories';

container.registerSingleton<IProductRepo>(
  'ProductRepository',
  delay(() => ProductRepository),
);
