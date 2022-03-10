import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryService } from '../inMemory/in-memory.service';
import { CreateWarehouseSchema } from '../warehouse/schemas/create-warehouse.schema';
import { ProductEntity } from './entities/product.entity';
import { CreateProductSchema, EditProductSchema } from './schemas';

@Injectable()
export class ProductService {
  constructor(private readonly inMemoryService: InMemoryService) {}

  private countQuantityProduct(
    warehouses: CreateWarehouseSchema[] | undefined,
  ): number {
    if (!warehouses || warehouses.length === 0) return 0;

    return warehouses.reduce((total, local) => total + local.quantity, 0);
  }

  private calculateValuesProduct(object: CreateProductSchema): ProductEntity {
    const totalQuantity = this.countQuantityProduct(
      object.inventory.warehouses,
    );

    const result: ProductEntity = {
      ...object,
      inventory: {
        ...object.inventory,
        quantity: totalQuantity,
      },
      isMarketable: totalQuantity > 0,
    };

    return result;
  }

  private findOrFail(sku: number): CreateProductSchema {
    const existingProduct = this.inMemoryService
      .getProducts()
      .find((product) => product.sku === sku);

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return existingProduct;
  }

  private failIfFind(sku: number): void {
    const existingProduct = this.inMemoryService
      .getProducts()
      .find((product) => product.sku === sku);

    if (existingProduct) {
      throw new ForbiddenException('Product already exists');
    }
  }

  createProduct(schema: CreateProductSchema) {
    this.failIfFind(schema.sku);

    const newProduct = this.inMemoryService.create(schema);

    return this.calculateValuesProduct(newProduct);
  }

  updateBySku(sku: number, schema: EditProductSchema) {
    this.findOrFail(sku);

    const changedProduct = this.inMemoryService.editProductBySku(sku, schema);

    return this.calculateValuesProduct(changedProduct);
  }

  findAll() {
    const allProducts = this.inMemoryService.getProducts();

    return allProducts.map((product) => this.calculateValuesProduct(product));
  }

  findOneBySku(sku: number) {
    this.findOrFail(sku);

    const foundedProduct = this.inMemoryService.getProductBySku(sku);

    return this.calculateValuesProduct(foundedProduct);
  }

  deleteBySku(sku: number) {
    this.findOrFail(sku);

    return this.inMemoryService.deleteProductBySku(sku);
  }
}
