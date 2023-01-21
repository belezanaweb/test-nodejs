import { Logger, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import ProductService from './product.service';

describe('Product Service', () => {
  let productService: ProductService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [Logger, ProductService, ProductRepository],
    }).compile();

    productService = await module.resolve<ProductService>(ProductService);
  });

  describe('Get product by SKU', () => {
    it('Should return a array of SKU', async () => {
      await expect(productService.getProductBySku(1)).rejects.toThrow(
        'Sku 1 not found',
      );
    });

    it('Should return a new product', async () => {
      const product = await productService.insertProduct({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
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

      expect(product).toEqual({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
        inventory: {
          quantity: 15,
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
        isMarketable: true,
      });
    });
  });

  describe('Get all products', () => {
    it('Should return all products', async () => {
      productService.insertProduct({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
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
      const products = await productService.getAllProducts();

      expect(products).toEqual([
        {
          sku: 43264,
          name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
          inventory: {
            quantity: 15,
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
          isMarketable: true,
        },
      ]);
    });

    it('should not find any products', async () => {
      await expect(productService.getAllProducts()).rejects.toThrowError(
        'Products not found',
      );
    });
  });

  describe('Deleting product by sku', () => {
    it('should delete a product', async () => {
      await productService.insertProduct({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
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

      await expect(
        productService.deleteProductBySku(43264),
      ).resolves.not.toThrow();

      await expect(productService.getProductBySku(43264)).rejects.toThrowError(
        'Sku 43264 not found',
      );
    });
  });

  describe('Update product by sku', () => {
    it('should update a product', async () => {
      await productService.insertProduct({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
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

      await expect(
        productService.updateProductBySku(43264, {
          name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
          inventory: {
            warehouses: [
              {
                locality: 'SP',
                quantity: 55,
                type: 'ECOMMERCE',
              },
              {
                locality: 'MOEMA',
                quantity: 3,
                type: 'PHYSICAL_STORE',
              },
            ],
          },
        }),
      ).resolves.not.toThrow();

      const product = await productService.getProductBySku(43264);

      expect(product).toEqual({
        sku: 43264,
        name: `L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g`,
        inventory: {
          quantity: 58,
          warehouses: [
            {
              locality: 'SP',
              quantity: 55,
              type: 'ECOMMERCE',
            },
            {
              locality: 'MOEMA',
              quantity: 3,
              type: 'PHYSICAL_STORE',
            },
          ],
        },
        isMarketable: true,
      });
    });
  });
});
