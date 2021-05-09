import { STATUS_CODE } from './../../util/types';
import { CustomError } from '../../util/custom.error';

export class ProductError {
  productAlreadyExists() {
    throw new CustomError(
      'Dois produtos são considerados iguais se os seus skus forem iguais',
      STATUS_CODE.CONFLICT
    );
  }

  notFound() {
    throw new CustomError('Produto não encontrado', STATUS_CODE.NOT_FOUND);
  }
}