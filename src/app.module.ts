import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TODO - Set env variables
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
