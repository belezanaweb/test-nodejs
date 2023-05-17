import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException(this.formatErrors(errors));
    }

    return value;
  }

  private formatErrors(errors: any[]) {
    const formattedErrors = {};

    errors.forEach(({ property, constraints }) => {
      const values = Object.values(constraints);

      values.forEach((message: string) => {
        formattedErrors[property] = message;
      });
    });

    return { errors: formattedErrors };
  }
}
