import { Product } from "../domain/product";

export interface IProductRepository {
  /**
   * Save
   * @param product
   */
  save(product: Product): Promise<Product>;

  /**
   * Get
   */
  get(): Promise<Product[]>;

  /**
   * Update
   * @param sku
   * @param product
   */
  update(sku: number, product: Product): Promise<Product>;

  /**
   * exist
   * @param sku
   */
  exist(sku: number): Promise<boolean>;

  /**
   * Find
   * @param sku
   */
  find(sku: number): Promise<Product>;

  /**
   * Find WIth Warehouse
   * @param sku
   */
  findWithWarehouse(sku: number): Promise<Product>;

  /**
   * Remove
   * @param sku
   */
  remove(sku: number): Promise<void>;
}
