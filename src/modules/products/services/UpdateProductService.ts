import { inject, injectable } from 'tsyringe';
import { IProductRepo } from '../repo/IProductRepo';
import { IInputUpdateProduct } from '../dto/IInputUpdateProduct';
import AppError from '../../../shared/errors/AppError';

@injectable()
export class UpdateProductService {
  constructor(
    // eslint-disable-next-line
    // @ts-ignore
    @inject('ProductRepository')
    private productRepository: IProductRepo,
  ) {}

  public async execute(input: IInputUpdateProduct): Promise<any> {
    if (!(Number(input.sku) > 0))
      throw new AppError(
        'sku não informado',
        'UpdateProductService -> execute()',
        400,
        '0003',
        'NOT_FOUND',
      );

    const data = await this.productRepository.update(input.sku, input.product);
    return data;
  }
}
