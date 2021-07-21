import Product from '../../../domain/entities/Product';
import { ICreateProductUseCase } from '../../../domain/use-cases/product';
import { AppError } from '../../../presentation/errors';
import ICreateProductRepository from '../../../repositories/ICreateProductRepository';
import IGetProductRepository from '../../../repositories/IGetProductRepository';

import ProductDTO from '../ProductDTO';

export default class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly getRepository: IGetProductRepository,
    private readonly createRepository: ICreateProductRepository
  ) { }

  async execute(data: ProductDTO): Promise<Product> {
    const productAlreadyExists = await this.getRepository.get(data.sku);

    if (productAlreadyExists) throw new AppError('Dois produtos são considerados iguais se os seus skus forem iguais');

    return await this.createRepository.create(data);
  }
}
