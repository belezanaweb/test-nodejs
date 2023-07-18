import Product from "../../domain/Product";

interface ProductsRepositoryI {
  findBySku(sku: number): Promise<Product | undefined>;

  save(
    product: Product,
    isForNewProduct: boolean
  ): Promise<Product | undefined>;

  delete(sku: number): Promise<void>;
}

export default ProductsRepositoryI;
