import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import { resolve } from 'path';
import { ProductType } from './types/product.type';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const products = await this.getProductsList();
    const sku = products.filter(
      (product) => product.sku === createProductDto.sku,
    );

    if (sku.length) throw new ConflictException('Duplicated SKU');

    products.unshift(createProductDto);

    await this.saveProductsList(products);

    return createProductDto;
  }

  async findAll(): Promise<CreateProductDto[]> {
    return this.getProductsList();
  }

  async findOne(sku: number): Promise<ProductType> {
    const products = await this.getProductsList();
    const product = products.filter((product) => product.sku === sku);

    if (!product.length) throw new NotFoundException('SKU not found');

    const filteredProduct = product[0] as ProductType;
    filteredProduct.inventory.quantity =
      filteredProduct.inventory.warehouses.reduce(
        (acc, warehouse) => acc + warehouse.quantity,
        0,
      );
    filteredProduct.isMarketable = filteredProduct.inventory.quantity
      ? true
      : false;

    return filteredProduct;
  }

  async update(
    sku: number,
    updateProductDto: UpdateProductDto,
  ): Promise<CreateProductDto> {
    const products = await this.getProductsList();
    const index = products.findIndex((product) => product.sku === sku);

    if (index < 0) throw new NotFoundException('SKU not found');

    products[index].name = updateProductDto.name;
    products[index].inventory.warehouses =
      updateProductDto.inventory.warehouses;

    this.saveProductsList(products);

    return products[index];
  }

  async remove(sku: number): Promise<void> {
    const products = await this.getProductsList();
    const index = products.findIndex((product) => product.sku === sku);

    if (index < 0) throw new NotFoundException('SKU not found');

    products.splice(index, 1);
    this.saveProductsList(products);
  }

  private async getProductsList(): Promise<CreateProductDto[]> {
    const productsFile = resolve(
      __dirname,
      '..',
      '..',
      'products_list',
      'list.json',
    );

    const data = await fs.readFileSync(productsFile);
    return JSON.parse(data.toString());
  }

  private async saveProductsList(json: CreateProductDto[]): Promise<void> {
    const productsListFile = './products_list/list.json';

    await fs.writeFileSync(productsListFile, JSON.stringify(json));
  }
}
