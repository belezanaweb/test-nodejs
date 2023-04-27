import { CreateProductDto } from '../dto/create-product.dto';
import { ProductType } from '../types/product.type';

export const createProductDtoListMock: CreateProductDto[] = [
  {
    sku: 43261,
    name: 'Produto 1',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 1,
          type: 'ECOMMERCE',
        },
        {
          locality: 'MOEMA',
          quantity: 2,
          type: 'PHYSICAL_STORE',
        },
      ],
    },
  },
  {
    sku: 43262,
    name: 'Produto 2',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 2,
          type: 'ECOMMERCE',
        },
        {
          locality: 'MOEMA',
          quantity: 3,
          type: 'PHYSICAL_STORE',
        },
      ],
    },
  },
  {
    sku: 43263,
    name: 'Produto 3',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 0,
          type: 'ECOMMERCE',
        },
      ],
    },
  },
];

export const createProductDtoMock: CreateProductDto = {
  sku: 43261,
  name: 'Produto 1',
  inventory: {
    warehouses: [
      {
        locality: 'SP',
        quantity: 1,
        type: 'ECOMMERCE',
      },
      {
        locality: 'MOEMA',
        quantity: 2,
        type: 'PHYSICAL_STORE',
      },
    ],
  },
};

export const productTypeMock: ProductType = {
  sku: 43261,
  name: 'Produto 1',
  inventory: {
    quantity: 3,
    warehouses: [
      {
        locality: 'SP',
        quantity: 1,
        type: 'ECOMMERCE',
      },
      {
        locality: 'MOEMA',
        quantity: 2,
        type: 'PHYSICAL_STORE',
      },
    ],
  },
  isMarketable: true,
};
