import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EMPTY, from, Observable } from 'rxjs';
import { mergeMapTo, tap } from 'rxjs/operators';
import { throwNotFoundIfEmpty$ } from '../shared/observables/throw-not-found-if-empty.observable';
import { transform$ } from '../shared/observables/transform.observable';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductPresenterRo } from './presenters/product.presenter.ro';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('v1/product')
export class ProductController {
  logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ type: ProductPresenterRo, status: 201 })
  create(
    @Body() createProductDto: CreateProductDto,
  ): Observable<ProductPresenterRo> {
    return from(this.productService.create(createProductDto)).pipe(
      tap((product) =>
        this.logger.debug(
          `product created: ${JSON.stringify(product, undefined, 2)}`,
        ),
      ),
      transform$(ProductPresenterRo),
    );
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Find a product by SKU' })
  @ApiResponse({ type: ProductPresenterRo, status: 200 })
  findOne(@Param('sku') sku: string): Observable<ProductPresenterRo> {
    return from(this.productService.findOne(+sku)).pipe(
      throwNotFoundIfEmpty$(),
      transform$(ProductPresenterRo),
    );
  }

  @Put(':sku')
  @ApiOperation({ summary: 'Update a product by SKU' })
  @ApiResponse({ type: ProductPresenterRo, status: 200 })
  update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<ProductPresenterRo> {
    return from(this.productService.update(+sku, updateProductDto)).pipe(
      tap((product) =>
        this.logger.debug(
          `product updated: ${JSON.stringify(product, undefined, 2)}`,
        ),
      ),
      transform$(ProductPresenterRo),
    );
  }

  @Delete(':sku')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a product by SKU' })
  remove(@Param('sku') sku: string): Observable<never> {
    return from(this.productService.remove(+sku)).pipe(
      mergeMapTo(EMPTY),
      tap((product) =>
        this.logger.debug(
          `product deleted: ${JSON.stringify(product, undefined, 2)}`,
        ),
      ),
    );
  }
}
