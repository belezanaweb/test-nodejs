import HttpStatusCodes from 'http-status-codes';

import Product from '../../../domain/entities/Product';
import { IUpdateProductUseCase } from '../../../domain/use-cases/product';
import { AppError } from '../../../presentation/errors';
import IGetProductRepository from '../../../repositories/IGetProductRepository';
import IUpdateProductRepository from '../../../repositories/IUpdateProductRepository';

import ProductDTO from '../ProductDTO';

export default class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    private readonly getRepository: IGetProductRepository,
    private readonly updateRepository: IUpdateProductRepository
  ) { }

  async execute(sku: number, data: ProductDTO): Promise<Product> {
    const product = await this.getRepository.get(sku);

    if (!product) throw new AppError('Produto não encontrado', HttpStatusCodes.NOT_FOUND);

    return await this.updateRepository.update(sku, data);
  }
}
