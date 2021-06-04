import supertest, { SuperTest } from 'supertest';
import { Server } from '../src/server';

let request: SuperTest<supertest.Test>;


beforeEach(async () => {
  const server = new Server();
  await server.init();
  request = supertest(server.getApp());
});

describe("Product controller tests", () => {
  const defaultProduct = {
    "sku": 43264,
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
      "warehouses": [
        {
          "locality": "SP",
          "quantity": 12,
          "type": "ECOMMERCE"
        },
        {
          "locality": "MOEMA",
          "quantity": 3,
          "type": "PHYSICAL_STORE"
        }
      ]
    },
  }

  it("should return an error with status 400 when trying to get a nonexistent product", async () => {
    const res = await request.get(`/product/${defaultProduct.sku}`);

    expect(res.body).toMatchObject({error: "Product not found!"})
    expect(res.statusCode).toBe(400);
  });

  it("should return an error with status 400 when trying to delete a nonexistent product", async () => {
    const res = await request.delete(`/product/${defaultProduct.sku}`);

    expect(res.body).toMatchObject({error: "Product not found!"})
    expect(res.statusCode).toBe(400);
  });

  it("should return an error with status 400 when trying to update a nonexistent product", async () => {
    const prod = {...defaultProduct, name: 'teste'};
    const res = await request.put(`/product/${defaultProduct.sku}`).send(prod);

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({error: "Product not found!"})
  });

  it("should create a new product and return a 201 status", async () => {
    const res = await request.post('/product').send(defaultProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(defaultProduct);
  });

  it("should return a 400 status and error message if product already exists", async () => {
    await request.post('/product').send(defaultProduct);
    const res = await request.post('/product').send(defaultProduct);
    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({error: 'Product already exists'});
  });

  it("should return a product with the quantity and isMarketable if it exists", async () => {
    await request.post('/product').send(defaultProduct);
    const res = await request.get(`/product/${defaultProduct.sku}`);

    const qtdProduct =
      defaultProduct
        .inventory
        .warehouses
        .reduce((acc, current) => acc + current.quantity, 0);

    expect(res.statusCode).toBe(200);
    expect(res.body.sku).toBe(defaultProduct.sku);
    expect(res.body.inventory.quantity).toBe(qtdProduct);
    expect(res.body.isMarketable).toBe(qtdProduct > 0);
  });

  it("should return a status code 200 when successfully delete a product", async () => {
    await request.post('/product').send(defaultProduct);
    const res = await request.delete(`/product/${defaultProduct.sku}`);

    expect(res.statusCode).toBe(200);
  });

  it("should return the updated product with the status code 200 when a product is updated successfully", async () => {
    await request.post('/product').send(defaultProduct);

    const prod = {...defaultProduct, name: 'teste'};
    const res = await request.put(`/product/${defaultProduct.sku}`).send(prod);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(prod);
  });
});
