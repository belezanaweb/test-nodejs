import { Product } from "../src/models/Product";
import { ProductRepositoryInMemory } from "../src/repository/ProductRepositoryInMemory";
import { ProductService } from "../src/services/ProductService";

describe("Product service tests", () => {
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

  it("should create a new product", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    const newProduct = await productService.create(defaultProduct);

    expect(newProduct).toBe(defaultProduct);
  });

  it("should throw an error if the product already exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    //create a new product
    await productService.create(defaultProduct);

    let error: Error;
    try{
      await productService.create(defaultProduct)
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(new Error("Product already exists"));
  });

  it("should get the product if it exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    //create a new product
    await productService.create(defaultProduct);

    const product = await productService.get(defaultProduct.sku);

    expect(product).not.toBeUndefined();
    expect(product.sku).toEqual(defaultProduct.sku);
  });

  it("should get an error if product not exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);;

    let error: Error;
    try {
      await productService.get(defaultProduct.sku);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(new Error("Product not found!"));
  });

  it("should get the invetory.quantity and isMarketable if product exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    //create a new product
    await productService.create(defaultProduct);

    const product = await productService.get(defaultProduct.sku);

    expect(product.isMarketable).not.toBeUndefined();
    expect(product.isMarketable).toBe(true);

    expect(product.inventory.quantity).not.toBeUndefined();
    expect(product.inventory.quantity).toBe(15);
  });

  it("should update a product", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    //create a new product
    await productService.create(defaultProduct);

    const product = {...defaultProduct};

    product.name = "teste";

    const newProduct = await productService.update(product.sku, product);

    expect(newProduct.name).toMatch("teste");
  });

  it("should throw an error if the product updated not exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    const product = {...defaultProduct};

    product.name = "teste";

    let error: Error;
    try{
      await productService.update(product.sku, product);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(new Error("Product not found!"));
  });

  it("should delete a product by sku", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    //create a new product
    await productService.create(defaultProduct);

    const deleted = await productService.delete(defaultProduct.sku);

    expect(deleted).toBe(true);
  });

  it("should throw an error when deleting a product if it is not exists", async () => {
    const repository = new ProductRepositoryInMemory();
    const productService = new ProductService(repository);

    let error: Error;
    try{
      await productService.delete(defaultProduct.sku);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(new Error("Product not found!"))
  });
});
