import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WarehousesDto } from './dto/warehouses.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export default class ProductService {
  public constructor(
    private logger: Logger,
    private productRepository: ProductRepository,
  ) {}

  /**
   * Get all products.
   */
  public async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.getAllProducts();
    const response: ProductResponseDto[] = [];

    if (products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    for (const product of products) {
      response.push(this.buildResponse(product));
    }

    return response;
  }

  /**
   * Get product by sku.
   * @param sku Sku (Stock Keeping Unit).
   */
  public async getProductBySku(sku: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.getProductBySku(sku);

    if (!product) {
      this.logger.log(`Sku ${sku} not found`);
      throw new NotFoundException(`Sku ${sku} not found`);
    }

    return this.buildResponse(product);
  }

  /**
   * Insert a new product.
   * @param payload Payload for create a new product.
   */
  public async insertProduct(payload: ProductDto): Promise<ProductResponseDto> {
    this.logger.log(
      `Create a new product with payload ${JSON.stringify(payload, null, 2)}`,
    );
    const newProduct = await this.productRepository.insertProduct(payload);

    this.logger.log(
      `Product inserted whit success ${JSON.stringify(newProduct, null, 2)}`,
    );

    return this.getProductBySku(newProduct.sku);
  }

  /**
   * Delete a product by sku.
   * @param sku Sku (Stock Keeping Unit).
   */
  public async deleteProductBySku(sku: number): Promise<void> {
    await this.getProductBySku(sku);

    this.logger.log(`Deleting product with sku ${sku}`);

    await this.productRepository.deleteProductBySku(sku);
  }

  /**
   * Update a product by sku.
   * @param sku Sku (Stock Keeping Unit).
   * @param warehouses List of warehouses.
   */
  public async updateProductBySku(
    sku: number,
    payload: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.getProductBySku(sku);

    this.logger.log(
      `Update product with sku ${sku}. Before update: ${JSON.stringify(
        payload,
        null,
        2,
      )} and payload after update: ${JSON.stringify(product, null, 2)}`,
    );

    await this.productRepository.updateProductBySku(sku, payload);

    return this.getProductBySku(sku);
  }

  /**
   * Calculate inventory.
   * @param warehouses List of warehouses.
   */
  private calculateInventory(warehouses: WarehousesDto[]): number {
    const initialValue = 0;
    const quantity = warehouses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      initialValue,
    );

    return quantity;
  }

  /**
   * Build product response.
   * @param product
   */
  private buildResponse(product: ProductDto): ProductResponseDto {
    const quantity = this.calculateInventory(product.inventory.warehouses);

    return {
      sku: product.sku,
      name: product.name,
      inventory: {
        quantity,
        warehouses: product.inventory.warehouses,
      },
      isMarketable: quantity > 0,
    };
  }
}
