import { Module } from '@nestjs/common';

import { InMemoryModule } from './inMemory/in-memory.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [InMemoryModule, ProductModule],
})
export class AppModule {}
