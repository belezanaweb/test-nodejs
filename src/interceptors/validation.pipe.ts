import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException(this.errorFormatter(errors));
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !metatype || !types.includes(metatype);
  }

  private errorFormatter(errors: ValidationError[]) {
    return errors.reduce(
      (totalMessages: string[], { constraints, children }: ValidationError) => {
        if (children.length) {
          totalMessages.push(...this.errorFormatter(children));
        } else {
          const values = Object.values(constraints);
          values.forEach((message: string) => totalMessages.push(message));
        }

        return totalMessages;
      },
      [],
    );
  }
}
