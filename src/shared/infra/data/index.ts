import { Product } from '../../../modules/products/repo/IProductRepo';

const data: Product[] = [];

const initData = {
  sku: 1,
  name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
  inventory: {
    warehouses: [
      {
        locality: 'SP',
        quantity: 12,
        type: 'ECOMMERCE',
      },
      {
        locality: 'MOEMA',
        quantity: 3,
        type: 'PHYSICAL_STORE',
      },
    ],
  },
};
data.push(initData);

export default class MemoryProducts {
  async find(id: number): Promise<Product | object> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        const prd = data.filter((item: Product) => item.sku === id);
        resolve(prd.length ? prd[0] : {});
      }, 1000);
    });
  }

  async create(_product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { sku } = _product;
        const some = data.some((item: Product) => item.sku === sku);
        if (some) {
          reject(
            new Error(
              'Dois produtos são considerados iguais se os seus skus forem iguais',
            ),
          );
          return;
        }
        data.push({ ..._product });
        resolve(_product);
      }, 1000);
    });
  }

  async update(sku: number, _product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = data.findIndex((item: Product) => item.sku === sku);
        if (index < 0) {
          reject(new Error('Produto não encontrado'));
          return;
        }

        if ('sku' in _product) {
          delete _product.sku;
        }
        const store: Product = { sku, ..._product };

        data.splice(index, 1, store);
        resolve(store);
      }, 1000);
    });
  }

  async delete(sku: number): Promise<object> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = data.findIndex((item: Product) => item.sku === sku);
        if (index < 0) {
          reject(new Error('Produto não encontrado'));
          return;
        }
        data.splice(index, 1);
        resolve({});
      }, 1000);
    });
  }
}
