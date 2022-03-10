import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductSchema, EditProductSchema } from './schemas';
import { SkuSchema } from './schemas/sku.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createSchema: CreateProductSchema) {
    return this.productService.createProduct(createSchema);
  }

  @Patch(':sku')
  editProductBySku(
    @Param() params: SkuSchema,
    @Body() editSchema: EditProductSchema,
  ) {
    return this.productService.updateBySku(params.sku, editSchema);
  }

  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Get(':sku')
  getProductBySku(@Param() params: SkuSchema) {
    return this.productService.findOneBySku(params.sku);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':sku')
  deleteProductBySku(@Param() params: SkuSchema) {
    return this.productService.deleteBySku(params.sku);
  }
}
