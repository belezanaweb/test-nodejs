import { inject, injectable } from 'tsyringe';
import { IProductRepo } from '../repo/IProductRepo';
import { IInputCreateProduct } from '../dto/IInputCreateProduct';

@injectable()
export class CreateProductService {
  constructor(
    // eslint-disable-next-line
    // @ts-ignore
    @inject('ProductRepository')
    private productRepository: IProductRepo,
  ) {}

  public async execute(input: IInputCreateProduct): Promise<any> {
    const data = await this.productRepository.create(input.product);
    return data;
  }
}
