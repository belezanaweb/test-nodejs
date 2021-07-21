import HttpStatusCodes from 'http-status-codes';

import Product from '../../../domain/entities/Product';
import { IGetProductUseCase } from '../../../domain/use-cases/product';
import { AppError } from '../../../presentation/errors';
import IGetProductRepository from '../../../repositories/IGetProductRepository';

export default class GetProductUseCase implements IGetProductUseCase {
  constructor(
    private readonly repository: IGetProductRepository
  ) { }

  async execute(sku: number): Promise<Product> {
    const product = await this.repository.get(sku);

    if (!product) throw new AppError('Produto não encontrado', HttpStatusCodes.NOT_FOUND);

    return product;
  }
}
