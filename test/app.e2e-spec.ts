import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { InMemoryService } from '../src/inMemory/in-memory.service';
import { CreateProductSchemaHelper } from '../src/product/tests/helpers/create-product-schema.helper';

describe('App e2e', () => {
  let app: INestApplication;
  let inMemoryService: InMemoryService;

  beforeAll(async () => {
    const port = 3333;
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(port);

    inMemoryService = app.get(InMemoryService);
    await inMemoryService.cleanDB();
    pactum.request.setBaseUrl(`http://localhost:${port}`);
  });

  afterAll(() => {
    app.close();
  });

  describe('Products', () => {
    describe('Get empty products', () => {
      it('should get products', () => {
        return pactum
          .spec()
          .get('/products')
          .expectStatus(HttpStatus.OK)
          .expectBody([]);
      });
    });

    describe('Create product', () => {
      const createSchema = CreateProductSchemaHelper.getInstance();

      it('should create product', () => {
        return pactum
          .spec()
          .post('/products')
          .withBody(createSchema)
          .expectStatus(HttpStatus.CREATED)
          .stores('productSku', 'sku');
      });

      it('should throw error because product already exists', () => {
        return pactum
          .spec()
          .post('/products')
          .withBody(createSchema)
          .expectStatus(HttpStatus.FORBIDDEN);
      });
    });

    describe('Get products', () => {
      it('should get products', () => {
        return pactum
          .spec()
          .get('/products')
          .expectStatus(HttpStatus.OK)
          .expectJsonLength(1);
      });
    });

    describe('Get product by sku', () => {
      it('should get product by sku', () => {
        return pactum
          .spec()
          .get('/products/{sku}')
          .withPathParams('sku', '$S{productSku}')
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('$S{productSku}');
      });

      it('should not found product by sku', () => {
        return pactum
          .spec()
          .get('/products/{sku}')
          .withPathParams('sku', '0001')
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });

    describe('Edit product by sku', () => {
      const schema = CreateProductSchemaHelper.getInstance();
      schema.name = 'Batatinha frita';

      delete schema.sku;

      it('should edit product by sku', () => {
        return pactum
          .spec()
          .patch('/products/{sku}')
          .withPathParams('sku', '$S{productSku}')
          .withBody(schema)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('$S{productSku}')
          .expectBodyContains(schema.name);
      });

      it('should not found product by sku', () => {
        return pactum
          .spec()
          .patch('/products/{sku}')
          .withPathParams('sku', '0001')
          .withBody(schema)
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });

    describe('Delete product by sku', () => {
      it('should delete product by sku', () => {
        return pactum
          .spec()
          .delete('/products/{sku}')
          .withPathParams('sku', '$S{productSku}')
          .expectStatus(HttpStatus.NO_CONTENT);
      });

      it('should not found product by sku', () => {
        return pactum
          .spec()
          .delete('/products/{sku}')
          .withPathParams('sku', '0001')
          .expectStatus(HttpStatus.NOT_FOUND);
      });

      it('should get empty products', () => {
        return pactum
          .spec()
          .get('/products')
          .expectStatus(HttpStatus.OK)
          .expectJsonLength(0);
      });
    });
  });
});
