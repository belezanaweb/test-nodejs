import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { transform$ } from '../shared/observables/transform.observable';
import { validate$ } from '../shared/observables/validate.observable';
import { ProductRepositoryInMemory } from './adapters/product.repository.in-memory';
import { CreateProductDto } from './dtos/create-product.dto';
import { E_WAREHOUSE_STORE_TYPE } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProductRepository } from './repository/product.repository.interface';

describe('ProductController', () => {
  let controller: ProductController;
  let repository: IProductRepository;
  const product = {
    sku: 1,
    name: 'Teste',
    inventory: {
      warehouses: [
        {
          locality: 'SP',
          quantity: 1,
          type: E_WAREHOUSE_STORE_TYPE.ECOMMERCE,
        },
      ],
    },
  } as CreateProductDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: IProductRepository,
          useClass: ProductRepositoryInMemory,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    repository = module.get(IProductRepository);
  });

  afterEach(() => {
    (repository as ProductRepositoryInMemory).truncate();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should to fail when create an empty instance of CreateAddressDto', async () => {
    try {
      await of({})
        .pipe(transform$(CreateProductDto), validate$<CreateProductDto>())
        .toPromise();
      throw new Error('Should not get here');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('should to create an product and find than', async () => {
    const createdProduct = await controller.create(product).toPromise();
    const foundedProduct = await repository.findOne(product.sku);

    expect(createdProduct).toMatchObject(foundedProduct);
  });

  it('should to create and delete a product', async () => {
    try {
      const createdProduct = await controller.create(product).toPromise();
      const foundedProduct = await repository.findOne(product.sku);

      expect(createdProduct).toMatchObject(foundedProduct);

      await controller.remove(product.sku.toString()).toPromise();

      await controller.findOne(product.sku.toString()).toPromise();
      throw new Error('Should not get here');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should to create and update a product', async () => {
    const newName = 'teste atualizado';

    const createdProduct = await controller.create(product).toPromise();
    const updatedProduct = await controller
      .update(product.sku.toString(), { ...product, name: newName })
      .toPromise();
    const foundedProduct = await repository.findOne(product.sku);

    expect(createdProduct).not.toMatchObject(foundedProduct);
    expect(updatedProduct).toMatchObject(foundedProduct);
    expect(updatedProduct.name).toBe(newName);
  });

  it('should to create and finde a product with calculated props', async () => {
    const createdProduct = await controller.create(product).toPromise();
    const foundedProduct = await controller
      .findOne(product.sku.toString())
      .toPromise();

    expect(createdProduct).toMatchObject(foundedProduct);
    expect(foundedProduct.isMarketable).toBe(true);
    expect(foundedProduct.inventory.quantity).toBe(1);
  });
});
