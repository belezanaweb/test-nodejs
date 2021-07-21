import HttpStatusCodes from 'http-status-codes';

import { IDeleteProductUseCase } from '../../../domain/use-cases/product';
import { AppError } from '../../../presentation/errors';
import IDeleteProductRepository from '../../../repositories/IDeleteProductRepository';
import IGetProductRepository from '../../../repositories/IGetProductRepository';

export default class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    private readonly getRepository: IGetProductRepository,
    private readonly deleteRepository: IDeleteProductRepository
  ) { }

  async execute(sku: number): Promise<void> {
    const product = await this.getRepository.get(sku);

    if (!product) throw new AppError('Produto não encontrado', HttpStatusCodes.NOT_FOUND);

    return await this.deleteRepository.delete(sku);
  }
}
