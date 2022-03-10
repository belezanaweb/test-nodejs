import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import assert from 'assert';
// import { assert } from 'chai';
import * as sinon from 'sinon';
import { InMemoryService } from '../../inMemory/in-memory.service';
import { CreateWarehouseSchemaHelper } from '../../warehouse/tests/helpers/create-warehouse-schema.helper';
import { ProductService } from '../product.service';
import { CreateProductSchemaHelper } from './helpers/create-product-schema.helper';
import { ProductEntityHelper } from './helpers/product-entity.helper';

describe('Product service', () => {
  let productService: ProductService;

  const inMemoryService = sinon.createStubInstance(InMemoryService);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: InMemoryService,
          useValue: inMemoryService,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Should find all products', () => {
    const product = ProductEntityHelper.getInstance();
    const expected = [product];
    const resolveArray = [CreateProductSchemaHelper.getInstance()];

    inMemoryService.getProducts.returns(resolveArray);

    const result = productService.findAll();

    expect(result).toEqual(expected);

    sinon.assert.called(inMemoryService.getProducts);
  });

  describe('When trying save a product', () => {
    const product = ProductEntityHelper.getInstance();

    const productInputSchema = CreateProductSchemaHelper.getInstance();

    it('Should save a product', () => {
      inMemoryService.create.withArgs(productInputSchema).returns(product);

      inMemoryService.getProducts.returns([]);

      const result = productService.createProduct(productInputSchema);

      expect(result).toEqual(product);

      sinon.assert.calledOnce(inMemoryService.create);
    });

    it('Should throws an error because sku already exists', () => {
      inMemoryService.create.withArgs(productInputSchema).returns(product);

      inMemoryService.getProducts.returns([productInputSchema]);

      try {
        productService.createProduct(productInputSchema);
      } catch (error) {
        sinon.assert.notCalled(inMemoryService.create);
        sinon.assert.calledOnce(inMemoryService.getProducts);

        expect(error).toBeInstanceOf(ForbiddenException);

        return;
      }

      throw Error(
        'Expected ForbiddenException error to be thrown, but was not',
      );
    });
  });

  describe('When trying update a product', () => {
    const warehouseSchema = CreateWarehouseSchemaHelper.getInstance();

    const productUpdateSchema = CreateProductSchemaHelper.getInstance();
    productUpdateSchema.inventory.warehouses.push(warehouseSchema);
    productUpdateSchema.name = 'batatinha frita';

    const product = ProductEntityHelper.getInstance();
    product.name = 'batatinha frita';
    product.inventory.warehouses.push(warehouseSchema);

    it('Should update a product', () => {
      const sku = product.sku;

      inMemoryService.editProductBySku
        .withArgs(sku, productUpdateSchema)
        .resolves(product);

      inMemoryService.getProducts.returns([productUpdateSchema]);
      inMemoryService.editProductBySku
        .withArgs(sku, productUpdateSchema)
        .returns(productUpdateSchema);

      const result = productService.updateBySku(sku, productUpdateSchema);

      // calcs - domain rules
      product.inventory.quantity = result.inventory.warehouses.reduce(
        (total, thisProduct) => total + thisProduct.quantity,
        0,
      );
      product.isMarketable = product.inventory.quantity > 0;

      // end calcs

      expect(result).toEqual(product);

      sinon.assert.calledWith(
        inMemoryService.editProductBySku,
        sku,
        productUpdateSchema,
      );

      sinon.assert.calledOnce(inMemoryService.getProducts);
    });

    it('Should not update a product because it was not found', () => {
      const sku = 1;

      inMemoryService.editProductBySku
        .withArgs(sku, productUpdateSchema)
        .resolves(product);

      inMemoryService.getProducts.returns([]);

      try {
        productService.updateBySku(sku, productUpdateSchema);
      } catch (error) {
        sinon.assert.notCalled(inMemoryService.editProductBySku);

        sinon.assert.calledOnce(inMemoryService.getProducts);

        expect(error).toBeInstanceOf(NotFoundException);

        return;
      }

      throw Error('Expected NotFoundException error to be thrown, but was not');
    });
  });

  describe('When trying find a product', () => {
    const product = ProductEntityHelper.getInstance();
    const expected = CreateProductSchemaHelper.getInstance();

    it('Should find a product by sku', () => {
      inMemoryService.getProducts.returns([expected]);
      inMemoryService.getProductBySku.withArgs(product.sku).returns(expected);

      const result = productService.findOneBySku(product.sku);

      expect(result).toEqual(product);

      sinon.assert.calledWith(inMemoryService.getProductBySku, product.sku);
    });

    it('Should not find a product by id because it does not exist', () => {
      inMemoryService.getProducts.returns([]);

      try {
        productService.findOneBySku(product.sku);
      } catch (error) {
        sinon.assert.notCalled(inMemoryService.getProductBySku);

        sinon.assert.calledOnce(inMemoryService.getProducts);

        expect(error).toBeInstanceOf(NotFoundException);

        return;
      }

      throw Error(
        'Expected NotFoundException error to be thrown, but it was not',
      );
    });
  });

  describe('When trying delete a product', () => {
    const product = ProductEntityHelper.getInstance();
    const expected = CreateProductSchemaHelper.getInstance();

    it('Should delete a product by sku', () => {
      inMemoryService.getProducts.returns([expected]);
      inMemoryService.deleteProductBySku.withArgs(product.sku).returns();

      productService.deleteBySku(product.sku);

      sinon.assert.calledWith(inMemoryService.deleteProductBySku, product.sku);
    });

    it('Should not delete a product by id because it does not exist', () => {
      inMemoryService.getProducts.returns([]);

      try {
        productService.deleteBySku(product.sku);
      } catch (error) {
        sinon.assert.notCalled(inMemoryService.deleteProductBySku);

        sinon.assert.calledOnce(inMemoryService.getProducts);

        expect(error).toBeInstanceOf(NotFoundException);

        return;
      }

      throw Error(
        'Expected NotFoundException error to be thrown, but it was not',
      );
    });
  });
});
