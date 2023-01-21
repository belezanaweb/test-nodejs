import { Logger, Module } from '@nestjs/common';
import ProductController from './product.controller';
import { ProductRepository } from './product.repository';
import ProductService from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [Logger, ProductService, ProductRepository],
})
export class ProductModule {}
