import { Request, Response } from "express";
import ProductUseCase from "../../../src/application/usecases/ProductUseCases";
import ProductController from "../../../src/interfaces/ProductController";
import ProductsRepositoryI from "../../../src/infraestructure/repositories/ProductRepositoryInterface";
import ProductsRepository from "../../../src/infraestructure/repositories/ProductRepository";
describe("ProductController", () => {
  let productRepositoryI: ProductsRepositoryI;
  let productUseCase: ProductUseCase;
  let productController: ProductController;

  beforeEach(() => {
    productRepositoryI = new ProductsRepository();
    productUseCase = new ProductUseCase(productRepositoryI);
    productController = new ProductController(productUseCase);
  });

  describe("create", () => {
    it("should create a new product and return 201 status code", async () => {
      const req = { body: { sku: 123, name: "Product 1", inventory: {} } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await productController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it("should handle errors and return 400 status code", async () => {
      const req = { body: { sku: 123, name: "Product 1", inventory: {} } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = "Error message";
      productUseCase.createProduct = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await productController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("update", () => {
    it("should update an existing product", async () => {
      const req: Partial<Request> = {
        body: { sku: 123, name: "Updated Product", inventory: {} },
      };
      const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await productController.update(req as Request, res as Response);

      expect(res.json).toHaveBeenCalled();
    });

    it("should handle errors and return 400 status code", async () => {
      const req: Partial<Request> = {
        body: { sku: 123, name: "Product 1", inventory: {} },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = "Error message";
      productUseCase.updateProduct = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await productController.update(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("get", () => {
    it("should get a product by SKU", async () => {
      const req: Partial<Request> = { params: { sku: "123" } };
      const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await productController.get(req as Request, res as Response);

      expect(res.json).toHaveBeenCalled();
    });

    it("should handle errors and return 400 status code", async () => {
      const req: Partial<Request> = { params: { sku: "123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = "Error message";
      productUseCase.getProduct = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await productController.get(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
