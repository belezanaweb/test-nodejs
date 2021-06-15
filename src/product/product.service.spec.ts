import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryInMemory } from './adapters/product.repository.in-memory';
import { ProductService } from './product.service';
import { IProductRepository } from './repository/product.repository.interface';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: IProductRepository,
          useClass: ProductRepositoryInMemory,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
