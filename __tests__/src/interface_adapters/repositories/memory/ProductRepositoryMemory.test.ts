import Inventory from "src/domain/entities/Inventory";
import Product from "src/domain/entities/Product";
import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";
import ProductAlreadyExistsException from "src/domain/exceptions/ProductAlreadyExistsException";
import ProductNotFoundWhileUpdatingException from "src/domain/exceptions/ProductNotFoundWhileUpdatingException";
import ProductRepositoryMemory from "src/interface_adapters/repositories/memory/ProductRepositoryMemory";

describe("ProductRepositoryMemory", () => {
  let productRepository: ProductRepositoryMemory;
  let inventory: Inventory;

  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    inventory = new Inventory({ warehouses: [new Warehouse({ locality: "SP", quantity: 1, type: WarehouseType.ecommerce })] });
  });

  describe("create", () => {
    it("should create a new product in the repository", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      const createdProduct = await productRepository.create({ product });
      expect(createdProduct).toEqual(product);
    });

    it("should throw an error if the product with the same SKU already exists in the repository", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      await productRepository.create({ product });
      await expect(productRepository.create({ product })).rejects.toThrow(ProductAlreadyExistsException);
    });
  });

  describe("update", () => {
    it("should update an existing product in the repository", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      await productRepository.create({ product });

      const updatedProduct = new Product({ sku: 123, name: "Updated Test Product", inventory });
      const result = await productRepository.update({ product: updatedProduct });
      expect(result).toEqual(updatedProduct);
    });

    it("should throw an error if the product with the specified SKU is not found in the repository", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      await expect(productRepository.update({ product })).rejects.toThrow(ProductNotFoundWhileUpdatingException);
    });
  });

  describe("delete", () => {
    it("should delete an existing product from the repository", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      await productRepository.create({ product });

      await productRepository.delete({ sku: 123 });
      const result = await productRepository.getBySku({ sku: 123 });
      expect(result).toBeNull();
    });

    it("should throw an error if the product with the specified SKU is not found in the repository", async () => {
      await expect(productRepository.delete({ sku: 123 })).rejects.toThrow(ProductAlreadyExistsException);
    });
  });

  describe("getBySku", () => {
    it("should return null if the product with the specified SKU is not found in the repository", async () => {
      const result = await productRepository.getBySku({ sku: 123 });
      expect(result).toBeNull();
    });

    it("should return the product with the specified SKU", async () => {
      const product = new Product({ sku: 123, name: "Test Product", inventory });
      await productRepository.create({ product });

      const result = await productRepository.getBySku({ sku: 123 });
      expect(result).toEqual(product);
    });
  });
});
