import { getCustomRepository } from "typeorm";
import { Product } from "../../../domain/product";
import { ProductDatabaseRepository } from "../../../providers/databases/entities/product/product-database.repository";
import { IProductRepository } from "../../iproduct.repository";

export class ProductRepository implements IProductRepository {

  /**
   * Get
   * @returns
   */
  async get(): Promise<Product[]> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    return await repository.find({
      select: ['sku', 'name'],
      relations: ['warehouses']
    });
  }

  /**
   * Find
   * @param sku
   */
  async find(sku: number): Promise<Product> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    return await repository.findOne({
      where: {
        sku: sku
      }
    })
  }

  /**
   * Find With Warehouses
   * @param sku
   * @returns
   */
  async findWithWarehouse(sku: number): Promise<Product> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    return await repository.findOne({
      select: ['sku', 'name'],
      relations: ['warehouses'],
      where: {
        sku: sku
      }
    });
  }

  /**
   * Save
   * @param product
   * @returns
   */
  async save(product: Product): Promise<Product> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    return await repository.save(product);
  }

  /**
   * Update
   * @param sku
   * @param product
   * @returns
   */
  async update(sku: number, product: Product): Promise<Product> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    return await repository.save({
      sku: sku,
      name: product.name
    });
  }

  /**
   * Remove
   * @param sku
   */
  async remove(sku: number): Promise<void> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    await repository.delete({
      sku: sku
    });
  }

  /**
   * Exist Product SKU
   * @param sku
   * @returns
   */
  async exist(sku: number): Promise<boolean> {
    const repository = getCustomRepository(ProductDatabaseRepository);
    const [allProducts] = await repository.findAndCount({
      where: {
        sku: sku
      }
    });
    return allProducts.length ? true : false;
  }
}
