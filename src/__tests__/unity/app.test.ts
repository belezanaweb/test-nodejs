// tslint:disable:no-unused-expression
import request from 'supertest';
import 'ts-jest';
import app from '../../';
import { product_data, update_data } from '../../__tests__seed__/seed';

describe('products', () => {
  it('Should get a health response from the server!', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect({ health: true }, done);
  });

  describe('Create a product', () => {
    it('Should create a new product', (done) => {
      request(app)
        .post('/products')
        .send(product_data)
        .expect(201)
        .expect({ message: 'Product created successfully!' }, done);
    });

    it('Should not allow creating a new product!', (done) => {
      request(app)
        .post('/products')
        .send(product_data)
        .expect(409)
        .expect('"SKU already exists!"', done);
    });
  });

  describe('Get a product', () => {
    it('Should get a product by its SKU and it should be markeatable!', (done) => {
      request(app)
        .get(`/products/${product_data.sku}`)
        .expect(200)
        .expect((response) => {
          response.body.isMarketable && response.body.inventory.quantity;
        }, done());
    });

    it('Should not allow getting a product with an unexisting SKU', (done) => {
      request(app)
        .get('/products/100')
        .expect(404)
        .expect('"SKU not found!"', done);
    });
  });

  describe('Update a product', () => {
    it('Should update a product by its SKU!', (done) => {
      request(app)
        .put(`/products/${product_data.sku}`)
        .send(update_data)
        .expect(202)
        .expect({ message: 'Product updated successfully!' }, done);
    });

    it('Should not allow updating a product with an unexisting SKU', (done) => {
      request(app)
        .put('/products/100')
        .expect(404)
        .expect('"SKU not found!"', done);
    });
  });

  describe('Get the updated product', () => {
    it('Should get the same product by its SKU and it should not be markeatable!', (done) => {
      request(app)
        .get(`/products/${product_data.sku}`)
        .expect(200)
        .expect((response) => {
          !response.body.isMarketable && !response.body.inventory.quantity;
        }, done());
    });
  });

  describe('Delete a Product', () => {
    it('Should delete a product by its SKU!', (done) => {
      request(app)
        .delete(`/products/${product_data.sku}`)
        .expect(202)
        .expect({ message: 'Product deleted successfully!' }, done);
    });

    it('Should not allow deleting a product with an unexisting SKU', (done) => {
      request(app)
        .delete(`/products/${product_data.sku}`)
        .expect(404)
        .expect('"SKU not found!"', done);
    });
  });
});
