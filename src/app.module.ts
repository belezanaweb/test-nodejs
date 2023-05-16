import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/belezanaweb?authSource=admin',
    ),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
