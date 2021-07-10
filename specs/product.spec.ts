import request from 'supertest';
import app from '../src/app';
import { GenericErrorResponse, ProductResponse } from '../src/controller/dtos';

import { ProductMockFactory } from './mock/product-mock-factory';

describe('Product Integration Test Suite', () => {

    test('should create a product', async (done) => {
        //Given

        //When
        const response = await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(201);

        done();
    });

    test('should not create a product for duplicated sku', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(412);
        expect(response.body).toBeDefined();

        const error: GenericErrorResponse = response.body;
        expect(error.errorMessage).toStrictEqual('SKU already exists.');

        done();
    });

    test('should not create a product with invalid request body', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).post(`/products`)
            .send(ProductMockFactory.createInvalidProductRequest())
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();

        done();
    });

    test('should update a product', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        let body = ProductMockFactory.createProductRequest();
        body.inventory.warehouses.slice(0, 1);

        const response = await request(app).put(`/products/123`)
            .send(body)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

        done();
    });

    test('should not update a product if it does not exists', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        let body = ProductMockFactory.createProductRequest();
        body.sku = 999;

        const response = await request(app).put(`/products/999`)
            .send(body)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(412);
        expect(response.body).toBeDefined();

        const error: GenericErrorResponse = response.body;
        expect(error.errorMessage).toStrictEqual('SKU not found.');

        done();
    });

    test('should find a product', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).get(`/products/123`)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

        const product: ProductResponse = response.body;
        expect(product.sku).toStrictEqual(123);
        expect(product.name).toBeDefined();
        expect(product.inventory).toBeDefined();
        expect(product.isMarketable).toBeDefined();
        expect(product.inventory.quantity).toBeDefined();
        expect(product.inventory.warehouses).toBeDefined();

        product.inventory.warehouses.forEach(w => {
            expect(w.locality).toBeDefined();
            expect(w.quantity).toBeDefined();
            expect(w.type).toBeDefined();
        });

        done();
    });

    test('should not find a product if it does not exists', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).get(`/products/999`)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(204);

        done();
    });

    test('should delete a product', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).delete(`/products/123`)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

        done();
    });

    test('should not delete a product if it does not exists', async (done) => {
        //Given
        await request(app).post(`/products`)
            .send(ProductMockFactory.createProductRequest())
            .set('Content-Type', 'application/json'); 

        //When
        const response = await request(app).delete(`/products/999`)
            .set('Content-Type', 'application/json');            

        //Then
        expect(response.status).toBe(412);
        expect(response.body).toBeDefined();

        const error: GenericErrorResponse = response.body;
        expect(error.errorMessage).toStrictEqual('SKU not found.');

        done();
    });
});
