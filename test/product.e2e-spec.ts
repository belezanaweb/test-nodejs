import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as request from 'supertest';
import {
  Product,
  ProductSchema,
} from '../src/modules/product/schemas/product.schema';
import { TestAppModule } from '../src/app.module.test';

const makeFakeProductData = (sku): Product => ({
  sku,
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

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let mongooseConnection: mongoose.Connection;
  let mongooseModel: mongoose.Model<Product>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUrl = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule, MongooseModule.forRoot(mongoUrl)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    mongooseConnection = moduleFixture.get<mongoose.Connection>(
      getConnectionToken(),
    );

    mongooseModel = mongooseConnection.model('Product', ProductSchema);
  });

  beforeEach(async () => {
    await mongooseModel.create(makeFakeProductData(1234));
  });

  afterEach(async () => {
    await mongooseModel.deleteMany();
  });

  afterAll(async () => {
    await mongooseConnection.close();
    await mongoServer.stop();
    await app.close();
  });

  describe('Create', () => {
    test('/product (POST) - Should return 201 on success', async () => {
      const fakeProductData = makeFakeProductData(123);

      const response = await request(app.getHttpServer())
        .post('/product')
        .send(fakeProductData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('sku', fakeProductData.sku);
    });

    test('/product (POST) - Should return 409 on duplicated error', async () => {
      const fakeProductData = makeFakeProductData(123);

      await request(app.getHttpServer()).post('/product').send(fakeProductData);

      const response = await request(app.getHttpServer())
        .post('/product')
        .send(fakeProductData)
        .expect(409);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Find by SKU', () => {
    test('/product/sku (GET) - Should return 200 on success', async () => {
      const { sku } = makeFakeProductData(1234);

      const response = await request(app.getHttpServer())
        .get(`/product/${sku}`)
        .expect(200);

      expect(response.body).toHaveProperty('isMarketable');
      expect(response.body).toHaveProperty('inventory');
      expect(response.body.inventory).toHaveProperty('quantity');
      expect(response.body).toHaveProperty('sku', sku);
    });

    test('/product/sku (GET) - Should return 404 on error', async () => {
      const invalid_sku = 4321;

      const response = await request(app.getHttpServer())
        .get(`/product/${invalid_sku}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Update', () => {
    test('/product/sku (PUT) - Should return 200 on success', async () => {
      const { sku, ...fakeProductData } = makeFakeProductData(1234);

      fakeProductData.name = 'updated_name';

      const response = await request(app.getHttpServer())
        .put(`/product/${sku}`)
        .send(fakeProductData);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('sku', sku);
      expect(response.body).toHaveProperty('name', 'updated_name');
    });

    test('/product/sku (PUT) - Should return 404 on error', async () => {
      const fakeProductData = makeFakeProductData(1234);
      const invalid_sku = 321;

      const response = await request(app.getHttpServer())
        .put(`/product/${invalid_sku}`)
        .send(fakeProductData);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Delete', () => {
    test('/product/sku (DELETE) - Should return 200 on success', async () => {
      const { sku } = makeFakeProductData(1234);

      await request(app.getHttpServer()).delete(`/product/${sku}`).expect(200);
    });

    test('/product/sku (DELETE) - Should return 404 on error', async () => {
      const invalid_sku = 321;

      const response = await request(app.getHttpServer())
        .delete(`/product/${invalid_sku}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });
});
