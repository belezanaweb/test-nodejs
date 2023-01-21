import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductService from './product.service';

@Controller('products')
@ApiTags('products')
export default class ProductController {
  public constructor(private productService: ProductService) {}

  /**
   * Get product by sku.
   * @param sku Stock Keeping Unit.
   */
  @Get(':sku')
  @ApiOperation({ summary: 'Get a product by sku (Stock Keeping Unit)' })
  @ApiResponse({
    status: 200,
    type: ProductResponseDto,
  })
  public getProductBySku(
    @Param('sku')
    sku: number,
  ): Promise<ProductResponseDto> {
    return this.productService.getProductBySku(sku);
  }

  /**
   * Get all products.
   */
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    type: [ProductResponseDto],
  })
  @Get()
  public getAllProduct(): Promise<ProductResponseDto[]> {
    return this.productService.getAllProducts();
  }

  /**
   * Insert a new product.
   */
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    type: ProductResponseDto,
  })
  @Post()
  public insertProduct(
    @Body() payload: ProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.insertProduct(payload);
  }

  /**
   * Update a product by sku.
   */
  @Patch(':sku')
  @ApiOperation({ summary: 'Update a product by sku (Stock Keeping Unit)' })
  @ApiResponse({
    status: 200,
    type: ProductResponseDto,
  })
  public updateProduct(
    @Param('sku') sku: number,
    @Body() payload: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.updateProductBySku(sku, payload);
  }

  /**
   * Delete a product by sku.
   */
  @ApiOperation({ summary: 'Delete a product by sku (Stock Keeping Unit)' })
  @ApiResponse({
    status: 200,
  })
  @Delete(':sku')
  public async deleteProductBySku(@Param('sku') sku: number): Promise<void> {
    await this.productService.deleteProductBySku(sku);
  }
}
