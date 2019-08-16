import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from 'routing-controllers';
import { Inject } from 'typedi';

import { ProductService } from '../../services/ProductService';
import Product from './../../interfaces/Product';

@JsonController('/products')
export class ProductController {
  @Inject()
  service: ProductService;

  @Get()
  getAll(): Product[] {
    return this.service.getAll();
  }

  @Get('/:sku')
  getById(@Param('sku') sku: number | string): Product {
    return this.service.getBySku(sku as number);
  }

  @HttpCode(201)
  @Post()
  create(@Body() product: Product): Product {
    return this.service.insert(product);
  }

  @Put('/:sku')
  update(@Param('sku') sku: number | string, @Body() product: Product): Product {
    return this.service.update(sku as number, product);
  }

  @HttpCode(204)
  @Delete('/:sku')
  remove(@Param('sku') sku: number | string): null {
    return this.service.remove(sku as number);
  }
}
