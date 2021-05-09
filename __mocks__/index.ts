import { IProduct } from './../src/api/product/product.interface';

export const mockProducts: IProduct[] = [
  {
    sku: 123,
    name: 'Perfume Boticário',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 10,
          type: 'ECOMMERCE'
        },
        {
          locality: 'RJ',
          quantity: 1,
          type: 'PHYSICAL_STORE'
        },
      ]
    }
  },
  {
    sku: 456,
    name: 'Creme Boticário',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 0,
          type: 'ECOMMERCE'
        },
        {
          locality: 'GO',
          quantity: 0,
          type: 'PHYSICAL_STORE'
        }
      ]
    }
  }
]

export const mockResponse = () => {
  const response: any = {};
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};