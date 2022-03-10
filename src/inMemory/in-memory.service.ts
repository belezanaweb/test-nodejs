import { Injectable } from '@nestjs/common';
import { CreateProductSchema } from '../product/schemas/create-product.schema';
import { EditProductSchema } from '../product/schemas/edit-product.schema';

@Injectable()
export class InMemoryService {
  localData: CreateProductSchema[];

  constructor() {
    this.localData = [];
  }

  cleanDB() {
    this.localData = [];
  }

  create(object: CreateProductSchema) {
    this.localData.push(object);

    return object;
  }

  editProductBySku(sku: number, object: EditProductSchema) {
    const existingProduct = this.getProductBySku(sku);

    existingProduct.name = object.name;
    existingProduct.inventory = object.inventory;

    return existingProduct;
  }

  getProducts() {
    return this.localData;
  }

  getProductBySku(sku: number) {
    return this.localData.find((product) => product.sku === sku);
  }

  deleteProductBySku(sku: number): void {
    this.localData = this.localData.filter((product) => product.sku !== sku);
  }
}
