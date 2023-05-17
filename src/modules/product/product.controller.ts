import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':sku')
  async findBySku(@Param('sku') sku: string) {
    return this.productService.findBySku(+sku);
  }

  @Put(':sku')
  async update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+sku, updateProductDto);
  }

  @Delete(':sku')
  async remove(@Param('sku') sku: string) {
    return this.productService.remove(+sku);
  }
}
