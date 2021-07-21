import HttpStatusCodes from 'http-status-codes';

import Product from "../../../../domain/entities/Product";
import { IGetProductUseCase } from '../../../../domain/use-cases/product';
import {
  IHttpRequest,
  IHttpResponse,
} from "../../../../presentation/protocols";
import ProductsInMemoryRepository from "../../../../repositories/implementations/ProductsInMemoryRepository";

import GetProductController from "../GetProductController";
import GetProductUseCase from "../GetProductUseCase";

describe('GetProductController', () => {
  const request = (params?: unknown): IHttpRequest => ({
    params,
  });

  const someProduct = (sku: number): Product => ({
    sku,
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
  });

  it('Should get a product', async () => {
    const product = someProduct(1);

    const useCase: IGetProductUseCase = {
      execute: () => Promise.resolve(product)
    };
    const controller = new GetProductController(useCase);

    const response: IHttpResponse = await controller.handle(request({ sku: 1 }));

    expect(response).toEqual({
      body: product,
      statusCode: HttpStatusCodes.OK,
    });
  });

  it('Should throw validation error (missing sku query param)', async () => {
    const repository = new ProductsInMemoryRepository();
    const useCase = new GetProductUseCase(repository);
    const controller = new GetProductController(useCase);

    try {
      await controller.handle(request({}));

      expect(true).toBe(false); // Fail test if above expression doesn't throw anything
    } catch (error) {
      expect(error).toEqual(new Error('"sku" is required'));
    }
  });

  it('Should throw AppError when doesn\'t exists any product with this sku', async () => {
    const repository = new ProductsInMemoryRepository();
    const useCase = new GetProductUseCase(repository);
    const controller = new GetProductController(useCase);

    try {
      await controller.handle(request({ sku: 2 }));

      expect(true).toBe(false); // Fail test if above expression doesn't throw anything
    } catch (error) {
      expect(error).toEqual(new Error('Produto não encontrado'));
    }
    });
});
