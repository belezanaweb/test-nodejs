import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product } from './schemas/product.schema';

const makeFakeProductData = (): Product => ({
  sku: 123,
  name: 'valid_name',
  inventory: {
    warehouses: [
      {
        locality: 'valid_locality',
        quantity: 1,
        type: 'valid_type',
      },
      {
        locality: 'valid_locality',
        quantity: 1,
        type: 'valid_type',
      },
    ],
  },
});

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            findBySku: jest.fn(
              () => new Promise((resolve) => resolve(makeFakeProductData())),
            ),
            create: jest.fn(
              () => new Promise((resolve) => resolve(makeFakeProductData())),
            ),
            update: jest.fn(
              () => new Promise((resolve) => resolve(makeFakeProductData())),
            ),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  describe('Product Service', () => {
    describe('Create', () => {
      test('Should call ProductRepository findBySku with the correct value', async () => {
        const fakeProductData = makeFakeProductData();

        const findBySkuSpy = jest
          .spyOn(repository, 'findBySku')
          .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

        await service.create(fakeProductData);

        expect(findBySkuSpy).toHaveBeenCalledWith(fakeProductData.sku);
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should throw if product SKU already exists', async () => {
        const findBySkuSpy = jest.spyOn(repository, 'findBySku');

        const promise = service.create(makeFakeProductData());

        expect(promise).rejects.toThrow();
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should return a product on success', async () => {
        const fakeProductData = makeFakeProductData();

        jest
          .spyOn(repository, 'findBySku')
          .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

        const createSpy = jest.spyOn(repository, 'create');

        const product = await service.create(fakeProductData);

        expect(product).toEqual(fakeProductData);
        expect(createSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('FindBySku', () => {
      test('Should be able to call ProductRepository findBySku with the correct value', async () => {
        const { sku } = makeFakeProductData();

        const findBySkuSpy = jest.spyOn(repository, 'findBySku');

        await service.findBySku(sku);

        expect(findBySkuSpy).toHaveBeenCalledWith(sku);
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should throw if product not found', async () => {
        const invalid_sku = 321;

        const findBySkuSpy = jest
          .spyOn(repository, 'findBySku')
          .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

        const promise = service.findBySku(invalid_sku);

        expect(promise).rejects.toThrow();
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should return a product with inventory.quantity and isMarketable on success', async () => {
        const { sku } = makeFakeProductData();

        const findBySkuSpy = jest.spyOn(repository, 'findBySku');

        const product = await service.findBySku(sku);

        expect(product).toHaveProperty('sku', sku);
        expect(product).toHaveProperty('isMarketable');
        expect(product).toHaveProperty('inventory');
        expect(product?.inventory).toHaveProperty('quantity');
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('Update', () => {
      test('Should be able to call ProductRepository findBySku with the correct value', async () => {
        const { sku: valid_sku, ...fakeProductData } = makeFakeProductData();

        const findBySkuSpy = jest.spyOn(repository, 'findBySku');

        await service.update(valid_sku, fakeProductData);

        expect(findBySkuSpy).toHaveBeenCalledWith(valid_sku);
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should throw if product not found', async () => {
        const { sku: invalid_sku, ...fakeProductData } = makeFakeProductData();

        const findBySkuSpy = jest
          .spyOn(repository, 'findBySku')
          .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

        const promise = service.update(invalid_sku, fakeProductData);

        expect(promise).rejects.toThrow();
        expect(findBySkuSpy).toHaveBeenCalledTimes(1);
      });

      test('Should return a updated product on success', async () => {
        const { sku: valid_sku, ...fakeProductData } = makeFakeProductData();

        const updateSpy = jest.spyOn(repository, 'update');

        const product = await service.update(valid_sku, fakeProductData);

        expect(product).toEqual(makeFakeProductData());
        expect(updateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
