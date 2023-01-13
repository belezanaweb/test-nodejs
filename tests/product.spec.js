const request = require("supertest");
const fs = require("fs");
const { StatusCode } = require("status-code-enum");
const app = require("../server");
const mock = fs.readFileSync(__dirname + "/mock.json");
const products = JSON.parse(mock);

describe("Product Create", () => {
  const productIdx = Math.floor(Math.random() * 100);
  it("Should create product", async () => {
    const res = await request(app).post("/product").send(products[productIdx]);
    const product = res.body;
    expect(res.statusCode).toBe(StatusCode.SuccessCreated);
    expect(product).toHaveProperty("sku");
    expect(product.sku).toBeGreaterThanOrEqual(0);
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("inventory");
    expect(product).toHaveProperty("inventory.warehouses");
    product.inventory.warehouses.forEach((warehouse) => {
      expect(warehouse).toHaveProperty("locality");
      expect(warehouse).toHaveProperty("quantity");
      expect(warehouse).toHaveProperty("type");
    });
  });

  it("Should not create product when already exist", async () => {
    const res = await request(app).post("/product").send(products[productIdx]);
    expect(res.statusCode).toBe(StatusCode.ClientErrorConflict);
  });

  it("Should remove product", async () => {
    const res = await request(app).delete(
      `/product/${products[productIdx].sku}`
    );
    expect(res.statusCode).toBe(StatusCode.SuccessNoContent);
  });
});

describe("Create mock products", () => {
  products.forEach((product) => {
    it(`Should create product with sku ${product.sku}`, async () => {
      const res = await request(app).post("/product").send(product);
      expect(res.statusCode).toBe(StatusCode.SuccessCreated);
    });
  });
});

describe("Product Get", () => {
  const productIdx = Math.floor(Math.random() * 100);

  it("Should get product", async () => {
    const res = await request(app).get(`/product/${products[productIdx].sku}`);
    const product = res.body;
    expect(res.statusCode).toBe(StatusCode.SuccessOK);
    expect(product).toHaveProperty("sku");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("isMarketable");
    expect(product).toHaveProperty("inventory");
    expect(product).toHaveProperty("inventory.quantity");
    expect(product).toHaveProperty("inventory.warehouses");
    expect(product.inventory.quantity).toBeGreaterThanOrEqual(0);
    product.inventory.warehouses.forEach((warehouse) => {
      expect(warehouse).toHaveProperty("locality");
      expect(warehouse).toHaveProperty("quantity");
      expect(warehouse).toHaveProperty("type");
    });
  });
});

describe("Update product", () => {
  const productIdx = Math.floor(Math.random() * 100);
  it("Should update product", async () => {
    const product = products[productIdx];
    product.name = "Teste Boticário";

    product.inventory.warehouses.forEach((warehouse) => {
      warehouse.quantity = 0;
    });

    const res = await request(app).put(`/product/${product.sku}`).send(product);

    const updatedProduct = res.body;
    expect(res.statusCode).toBe(StatusCode.SuccessOK);
    expect(updatedProduct).toHaveProperty("sku");
    expect(updatedProduct).toHaveProperty("name");
    expect(updatedProduct).toHaveProperty("inventory");
    expect(updatedProduct).toHaveProperty("inventory.warehouses");
    updatedProduct.inventory.warehouses.forEach((warehouse) => {
      expect(warehouse).toHaveProperty("locality");
      expect(warehouse).toHaveProperty("quantity");
      expect(warehouse).toHaveProperty("type");
    });
  });

  it("Should get product, and inventory quantity be equal 0 and isMarketable equal false", async () => {
    const res = await request(app).get(`/product/${products[productIdx].sku}`);
    const product = res.body;
    expect(res.statusCode).toBe(StatusCode.SuccessOK);
    expect(product).toHaveProperty("sku");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("isMarketable");
    expect(product).toHaveProperty("inventory");
    expect(product).toHaveProperty("inventory.quantity");
    expect(product).toHaveProperty("inventory.warehouses");
    expect(product.inventory.quantity).toEqual(0);
    expect(product.isMarketable).toEqual(false);
    product.inventory.warehouses.forEach((warehouse) => {
      expect(warehouse).toHaveProperty("locality");
      expect(warehouse).toHaveProperty("quantity");
      expect(warehouse).toHaveProperty("type");
    });
  });
});

describe("Remove all mock products", () => {
  products.forEach((product) => {
    it(`Should remove product with sku ${product.sku}`, async () => {
      const res = await request(app).delete(`/product/${product.sku}`);
      expect(res.statusCode).toBe(StatusCode.SuccessNoContent);
    });
  });
});
