import HttpStatusCodes from 'http-status-codes';

import Product from "../../../../domain/entities/Product";
import { AppError } from '../../../../presentation/errors';
import IGetProductRepository from "../../../../repositories/IGetProductRepository";

import GetProductUseCase from "../GetProductUseCase";

describe('GetProductUseCase', () => {
  it('Should get a product', async () => {
    const product = {
      sku: 1,
      name: 'Name',
      inventory: {
        quantity: 1,
        warehouses: [
          {
            locality: 'Locality',
            quantity: 1,
            type: 'TYPE',
          },
        ],
      },
      isMarketable: true,
    };

    const repository: IGetProductRepository = {
      get: () => Promise.resolve(product),
    };
    const useCase = new GetProductUseCase(repository);

    const result: Product = await useCase.execute(1);

    expect(result).toEqual(product);
  });

  it('Should get a 404 error when doesn\'t exists any product with this sku', async () => {
    const sku = 1;

    const repository: IGetProductRepository = {
      get: () => Promise.resolve(undefined),
    };
    const useCase = new GetProductUseCase(repository);

    try {
      await useCase.execute(sku);
    } catch (error) {
      expect(error).toEqual(new AppError('Produto não encontrado', HttpStatusCodes.NOT_FOUND));
    }
  });
});
