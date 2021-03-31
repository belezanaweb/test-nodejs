import * as Factory from 'factory.ts';
import CreateProductDto from '../../../src/modules/product/dto/create.product.dto';
import UpdateProductDto from '../../../src/modules/product/dto/update.product.dto';

const createProductDtoFactory = Factory.Sync.makeFactory<CreateProductDto>({
  sku: 1,
  name:
    "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
});

const updateProductDtoFactory = Factory.Sync.makeFactory<UpdateProductDto>({
  sku: 1,
  name:
    "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
});

const productDtoFactory = Factory.Sync.makeFactory<any>({
  sku: 1,
  name:
    "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
    quantity: 15,
  },
  isMarketable: true,
});

const createProduct = createProductDtoFactory.build();
const updateProduct = updateProductDtoFactory.build();
const product = productDtoFactory.build();

export { createProduct, updateProduct, product };
