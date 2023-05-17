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
  });
});
