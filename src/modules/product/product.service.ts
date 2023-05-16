import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const productAlreadyExists = await this.productRepository.findBySku(
      +createProductDto.sku,
    );

    if (productAlreadyExists) {
      throw new ConflictException('Este produto já existe!');
    }

    return this.productRepository.create(createProductDto);
  }

  async findBySku(sku: number): Promise<any> {
    const product = await this.productRepository.findBySku(sku);

    product.inventory.quantity = product.inventory.warehouses.length;
    product.isMarketable = !!product.inventory.quantity;

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(sku: number) {
    return this.productRepository.delete(sku);
  }
}
