import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(+sku);
  }

  @Patch(':sku')
  update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+sku, updateProductDto);
  }

  @Delete(':sku')
  @HttpCode(204)
  remove(@Param('sku') sku: string) {
    return this.productsService.remove(+sku);
  }
}
