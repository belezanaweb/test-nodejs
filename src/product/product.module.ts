import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { IProductRepository } from './repository/product.repository.interface';
import { ProductRepositoryInMemory } from './adapters/product.repository.in-memory';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepository,
      /**
       * A variação da injeção das classes concretas poderiam ser decididas por variaveis de ambiente por exemplo
       */
      useClass: ProductRepositoryInMemory,
    },
  ],
})
export class ProductModule {}
