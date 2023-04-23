import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IProductRepo } from '../repo/IProductRepo';

@injectable()
export class DeleteProductService {
  constructor(
    // eslint-disable-next-line
    // @ts-ignore
    @inject('ProductRepository')
    private productRepository: IProductRepo,
  ) {}

  public async execute(sku: number): Promise<any> {
    if (!(Number(sku) > 0)) {
      throw new AppError(
        'sku não informado',
        'DeleteProductService -> execute()',
        400,
        '0003',
        'NOT_FOUND',
      );
    }
    const data = await this.productRepository.delete(sku);
    return data;
  }
}
