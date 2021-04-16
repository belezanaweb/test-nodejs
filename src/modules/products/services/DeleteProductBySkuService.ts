import IProductRepository from '../infra/repositories/IProductRepository'

class DeleteProductBySkuService {
  constructor(private productsRepository: IProductRepository){}

  public async execute(sku: number) {
    await this.productsRepository.deleteProduct(sku);

    return;
  }
}

export default DeleteProductBySkuService;
