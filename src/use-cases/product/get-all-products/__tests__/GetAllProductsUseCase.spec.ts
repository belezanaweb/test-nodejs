import Product from "../../../../domain/entities/Product";
import IGetAllProductsRepository from "../../../../repositories/IGetAllProductsRepository";

import GetAllProductsUseCase from "../GetAllProductsUseCase";

describe('GetAllProductsUseCase', () => {
  it('Should get a empty list', async () => {
    const products: Array<Product> = [];
    const repository: IGetAllProductsRepository = {
      getAll: () => Promise.resolve(products),
    };
    const useCase = new GetAllProductsUseCase(repository);

    const result = await useCase.execute();

    expect(result).toHaveLength(0);
  });

  it('Should get a list of products', async () => {
    const products: Array<Product> = [
      {
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
      },
    ];
    const repository: IGetAllProductsRepository = {
      getAll: () => Promise.resolve(products),
    };
    const useCase = new GetAllProductsUseCase(repository);

    const result = await useCase.execute();

    expect(result).toEqual(products);
  });
});
