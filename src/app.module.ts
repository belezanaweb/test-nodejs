import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import env from './config/env';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.DATABASE_URL),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
