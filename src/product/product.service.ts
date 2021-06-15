import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessError, ERRORS } from '../shared/errors/business.error';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';
import { IProductRepository } from './repository/product.repository.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne(createProductDto.sku);
    if (product)
      throw new BusinessError(
        ERRORS.DUPLICATED_IDENTIFIER,
        'The product already exists',
      );

    return this.productRepository.createOne(
      plainToClass(Product, createProductDto),
    );
  }

  findOne(sku: number): Promise<Product> {
    return this.productRepository.findOne(sku);
  }

  async update(
    sku: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne(sku);
    if (!product) throw new NotFoundException();

    return this.productRepository.updateOne(sku, updateProductDto);
  }

  async remove(sku: number): Promise<Product> {
    const product = await this.productRepository.findOne(sku);
    if (!product) throw new NotFoundException();

    return this.productRepository.deleteOne(sku);
  }
}
