import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const productAlreadyExists = await this.productRepository.findBySku(
      +createProductDto.sku,
    );

    if (productAlreadyExists) {
      throw new ConflictException('Este SKU já existe!');
    }

    return this.productRepository.create(createProductDto);
  }

  async findBySku(sku: number) {
    const product = await this.productRepository.findBySku(sku);

    product.inventory.quantity = product.inventory.warehouses.reduce(
      (totalValue, { quantity }) => totalValue + quantity,
      0,
    );
    product.isMarketable = !!product.inventory.quantity;

    return product;
  }

  async update(sku: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new NotFoundException('SKU não localizado!');
    }

    return this.productRepository.update(product['_id'], updateProductDto);
  }

  async remove(sku: number) {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new NotFoundException('SKU não localizado!');
    }

    return this.productRepository.delete(sku);
  }
}
