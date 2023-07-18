import request from "supertest";
import express from "express";
import ProductUseCase from "../../src/application/usecases/ProductUseCases";
import ProductsRepositoryI from "../../src/infraestructure/repositories/ProductRepositoryInterface";
import ProductRepository from "../../src/infraestructure/repositories/ProductRepository";
import routerProduct from "../../src/infraestructure/routes";
import ProductController from "../../src/interfaces/ProductController";

describe("Product Routes", () => {
  let app: express.Application;
  let productRepository: ProductsRepositoryI;
  let productUseCase: ProductUseCase;
  let productController: ProductController;

  beforeEach(() => {
    productRepository = new ProductRepository();
    productUseCase = new ProductUseCase(productRepository);
    productController = new ProductController(productUseCase);
    app = express();
    app.use(express.json());
    app.use("/products", routerProduct(productController));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("POST /products", () => {
    it("should create a new product and return 201 status code", async () => {
      // Arrange
      const productData = {
        sku: 123,
        name: "Product 1",
        inventory: {},
      };

      // Act
      const response = await request(app).post("/products").send(productData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      // Additional assertions...
    });

    it("should handle errors and return 400 status code", async () => {
      // Arrange
      const productData = {
        sku: 123,
        name: "Product 1",
        inventory: {},
      };
      // Mock the use case method to throw an error
      productUseCase.createProduct = jest
        .fn()
        .mockRejectedValue(new Error("Some error message"));

      // Act
      const response = await request(app).post("/products").send(productData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Some error message" });
    });
  });

  describe("PUT /products/:sku", () => {
    it("should update an existing product", async () => {
      // Arrange
      const productData = { sku: 123, name: "Updated Product", inventory: {} };
      // Mock the use case method to resolve successfully
      productUseCase.createProduct = jest.fn().mockResolvedValue(productData);
      productUseCase.updateProduct = jest.fn().mockResolvedValue(productData);

      // Act
      const response = await request(app)
        .put("/products/123")
        .send(productData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(productData);
      // Additional assertions...
    });

    it("should handle errors and return 400 status code", async () => {
      // Arrange
      const productData = {
        sku: 123,
        name: "Product 1",
        inventory: {},
      };
      // Mock the use case method to throw an error
      productUseCase.updateProduct = jest
        .fn()
        .mockRejectedValue(new Error("Some error message"));

      // Act
      const response = await request(app)
        .put("/products/123")
        .send(productData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Some error message" });
    });
  });

  describe("GET /products/:sku", () => {
    it("should get a product by SKU", async () => {
      // Arrange

      productUseCase.getProduct = jest.fn().mockResolvedValue(12);
      // Act
      const response = await request(app).get("/products/123");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      // Additional assertions...
    });

    it("should handle errors and return 400 status code", async () => {
      // Arrange
      // Mock the use case method to throw an error
      productUseCase.getProduct = jest
        .fn()
        .mockRejectedValue(new Error("Some error message"));

      // Act
      const response = await request(app).get("/products/123");

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Some error message" });
    });
  });
});
