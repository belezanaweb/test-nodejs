import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BaseController } from '../../shared/controllers/base.controller';
import CreateProductDto from './dto/create.product.dto';
import UpdateProductDto from './dto/update.product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import ValidateCreate from './pipes/validateCreate.pipe';
import ValidateUpdate from './pipes/validateUpdate.pipe';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController extends BaseController {
  constructor(
    private readonly repository: ProductRepository,
    private readonly service: ProductService,
  ) {
    super();
  }

  @UsePipes(ValidateCreate)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.repository.save(createProductDto);
  }

  @Get()
  async find(): Promise<Product[]> {
    return this.repository.find();
  }

  @Get('/:sku')
  async findOne(@Param('sku', ParseIntPipe) sku: number): Promise<any> {
    return this.service.findOne(sku);
  }

  @UsePipes(ValidateUpdate)
  @Put('/:sku')
  async update(
    @Param('sku', ParseIntPipe) sku: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.repository.update(sku, updateProductDto);
  }

  @Delete('/:sku')
  async delete(@Param('sku', ParseIntPipe) sku: number): Promise<void> {
    return this.repository.delete(sku);
  }
}
