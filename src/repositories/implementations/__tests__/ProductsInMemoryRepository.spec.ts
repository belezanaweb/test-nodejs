import Product from '../../../domain/entities/Product';

import ProductsInMemoryRepository from '../ProductsInMemoryRepository';

describe('ProductsInMemoryRepository', () => {
  it('Should return a empty list of products', async () => {
    const repository = new ProductsInMemoryRepository();

    const list = await repository.getAll();

    expect(list).toHaveLength(0);
  });

  it('Should return undefined when a product with this SKU does not exists', async () => {
    const repository = new ProductsInMemoryRepository();

    const product = await repository.get(1);

    expect(product).toBeUndefined();
  });

  it('Should create a marketable product', async () => {
    const repository = new ProductsInMemoryRepository();

    const newItem = await repository.create({
      sku: 1,
      name: 'Name',
      inventory: {
        warehouses: [
          {
            locality: 'Locality',
            quantity: 5,
            type: 'TYPE',
          },
        ],
      },
    });

    expect(newItem).toEqual({
      sku: 1,
      name: 'Name',
      inventory: {
        quantity: 5,
        warehouses: [
          {
            locality: 'Locality',
            quantity: 5,
            type: 'TYPE'
          }
        ]
      },
      isMarketable: true,
    });

    const products = await repository.getAll();
    expect(products).toHaveLength(1);
  });

  it('Should return a no marketable product', async () => {
    const listInitial: Array<Product> = [
      {
        sku: 1,
        name: 'Name',
        inventory: {
          warehouses: [
            {
              locality: 'Locality',
              quantity: 0,
              type: 'TYPE',
            },
          ],
        },
      },
    ];

    const repository = new ProductsInMemoryRepository(listInitial);

    const products = await repository.getAll();
    expect(products).toHaveLength(1);
    expect(products[0].isMarketable).toEqual(false);
  });

  it('Should delete a product', async () => {
    const listInitial: Array<Product> = [
      {
        sku: 1,
        name: 'Name',
        inventory: {
          warehouses: [
            {
              locality: 'Locality',
              quantity: 0,
              type: 'TYPE',
            },
          ],
        },
      },
    ];

    const repository = new ProductsInMemoryRepository(listInitial);

    let products = await repository.getAll();
    expect(products).toHaveLength(1);

    await repository.delete(1);

    products = await repository.getAll();
    expect(products).toHaveLength(0);
  });

  it('Should update a product', async () => {
    const listInitial: Array<Product> = [
      {
        sku: 1,
        name: 'Name',
        inventory: {
          warehouses: [
            {
              locality: 'Locality',
              quantity: 0,
              type: 'TYPE',
            },
          ],
        },
      },
    ];

    const repository = new ProductsInMemoryRepository(listInitial);

    const item = await repository.update(1, {
      sku: 1,
      name: 'New name',
      inventory: {
        warehouses: [
          {
            locality: 'Locality',
            quantity: 1,
            type: 'TYPE',
          },
        ],
      },
    });

    expect(item).toEqual({
      sku: 1,
      name: 'New name',
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
  });
});
