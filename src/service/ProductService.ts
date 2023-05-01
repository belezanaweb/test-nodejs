// import Product from "src/domain/entities/Product";
import { ProductDto } from "../application/v1/dto/ProductDto";
import { ProductResquestData } from "../application/v1/dto/productResquest";
import Product from "../domain/entities/Product";
import { IInventoryRepository } from "../domain/repositories/InventoryRepository";
import { IProductRepository } from "../domain/repositories/ProductRepository";
import { IWarehouseRepository } from "../domain/repositories/WarehouseRepository";



export interface IProductService {
  getBySku(sku: number): Promise<Product>;
  create(product: ProductResquestData): Promise<string>;
  delete(sku: number): Promise<void>;
  update(productRequestData: ProductResquestData): Promise<Product>;
}

export class ProductService implements IProductService {
  constructor(
    private productRepository: IProductRepository,
    private inventoryRepository: IInventoryRepository,
    private warehouseRepository: IWarehouseRepository,
  ) {}

  async create(product: ProductResquestData): Promise<string> {
    const productId = await this.productRepository.create(product.name, product.sku);
    const inventoryId = await this.inventoryRepository.create(productId);

    await this.warehouseRepository.create(product.inventory.warehouses, inventoryId);

    return productId;
  }

  async getBySku(sku: number): Promise<Product> {
    const rawProduct = await this.productRepository.getBySku(sku);
    const product = new ProductDto().toDomain(rawProduct);
    return product;
  }

  async delete(sku: number): Promise<void> {
    await this.productRepository.delete(sku);
  }

  async update(productRequestData: ProductResquestData): Promise<Product> {
    await this.getBySku(productRequestData.sku);
    await this.delete(productRequestData.sku);
    await this.create(productRequestData);

    const product = await this.getBySku(productRequestData.sku);
    return product;
  }
}
