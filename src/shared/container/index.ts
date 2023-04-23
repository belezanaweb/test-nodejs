import { container } from 'tsyringe';
import { IProductRepo } from '../../modules/products/repo/IProductRepo';
import ProductRepository from '../../modules/products/infra/memoryRepo/ProductRepositories';

container.registerSingleton<IProductRepo>(
  'ProductRepository',
  ProductRepository,
);
