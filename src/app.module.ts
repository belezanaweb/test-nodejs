import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BusinessErrorFilter } from './shared/filters/business-error.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BusinessErrorFilter,
    },
  ],
})
export class AppModule {}
