import { ProductRepository } from '../../../src/modules/product/product.repository';
import { createProduct, updateProduct, product } from './data';
import Application from '../main.test';
import { ProductModule } from '../../../src/modules/product/product.module';

describe('product', () => {
  let app: any;
  let repository: ProductRepository;

  beforeAll(async () => {
    const { server, moduleRef } = await Application([ProductModule]);
    app = server;
    repository = moduleRef.get('ProductRepository');
  });

  it(`/POST product`, async (done) => {
    await app
      .post('/product')
      .send(createProduct)
      .set('Accept', 'application/json')
      .expect(201);
    const product = repository.findOne(1);
    expect(product).toEqual(expect.objectContaining(createProduct));
    done();
  });

  it(`/PUT product`, async (done) => {
    repository.save(createProduct);
    await app
      .put(`/product/1`)
      .send(updateProduct)
      .set('Accept', 'application/json')
      .expect(200);
    const product = repository.findOne(1);
    expect(product).toEqual(expect.objectContaining(product));
    done();
  });

  it(`/GET all products`, async (done) => {
    repository.save(createProduct);
    const { body } = await app.get('/product').expect(200);
    const product = repository.findOne(43264);
    expect(body[0]).toEqual(expect.objectContaining(product));
    done();
  });

  it(`/GET products by sku`, async (done) => {
    repository.save(createProduct);
    const { body } = await app.get('/product/1').expect(200);
    expect(body).toEqual(expect.objectContaining(product));
    done();
  });

  it(`/DELETE product by sku`, async (done) => {
    repository.save(createProduct);
    await app.delete('/product/1').expect(200);
    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
