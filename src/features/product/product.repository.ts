import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  private static products: ProductDto[];

  public constructor(private logger: Logger) {
    ProductRepository.products = [];
  }

  public async insertProduct(payload: ProductDto): Promise<ProductDto> {
    const product = await this.getProductBySku(payload.sku);

    if (product) {
      this.logger.log(
        `Sku ${payload.sku} is already registered in the database`,
      );
      throw new BadRequestException(
        `Sku ${payload.sku} is already registered in the database`,
      );
    }

    ProductRepository.products.push(payload);
    return payload;
  }

  public async getAllProducts(): Promise<ProductDto[]> {
    return ProductRepository.products;
  }

  public async deleteProductBySku(sku: number): Promise<void> {
    const index = ProductRepository.products.findIndex(
      (product) => product.sku === sku,
    );
    ProductRepository.products.splice(index, 1);
  }

  public async getProductBySku(sku: number): Promise<ProductDto> {
    return ProductRepository.products.find((product) => product.sku === sku);
  }

  public async updateProductBySku(
    sku: number,
    product: UpdateProductDto,
  ): Promise<void> {
    const index = ProductRepository.products.findIndex(
      (product) => product.sku === sku,
    );
    ProductRepository.products[index] = { ...product, sku };
  }
}
