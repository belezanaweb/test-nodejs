import {
  UseFilters,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http.exception.filter';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';
import { AllExceptionsFilter } from '../filters/all.exception.filter';

@UseInterceptors(ErrorsInterceptor)
@UseFilters(HttpExceptionFilter)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(ClassSerializerInterceptor)
export abstract class BaseController {}
