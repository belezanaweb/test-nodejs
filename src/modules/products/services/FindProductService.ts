import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IProductRepo, Product } from '../repo/IProductRepo';

@injectable()
export class FindProductService {
  constructor(
    // eslint-disable-next-line
    // @ts-ignore
    @inject('ProductRepository')
    private productRepository: IProductRepo,
  ) {}

  public async execute(input: { sku: number }): Promise<any> {
    if (!input.sku) {
      throw new AppError(
        'sku não informado',
        'FindProductService -> execute()',
        400,
        '0003',
        'NOT_FOUND',
      );
    }

    const data: Product | null = await this.productRepository.find(input.sku);
    if (!data) {
      throw new AppError(
        'Produto não encontrado',
        'FindProductService -> execute()',
        404,
        '0003',
        'NOT_FOUND',
      );
    }

    const totQtde = data.inventory.warehouses.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0,
    );
    const inventory = { ...data.inventory, quantity: totQtde };
    const newData: any = {
      ...data,
      isMarketable: totQtde > 0,
      inventory,
    };

    return newData;
  }
}
