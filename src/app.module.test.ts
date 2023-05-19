import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule],
  controllers: [],
  providers: [],
})
export class TestAppModule {}
