import { IProduct } from "../interfaces/product";

class ProductModel {
  private productsDatabase: IProduct[] = [];

  create(data: IProduct): number | null {
    this.productsDatabase.push(data);
    return data.sku;
  }

  findAll(): Array<IProduct> {
    return this.productsDatabase;
  }

  findBySku(sku: number): IProduct[] {
    return this.productsDatabase.filter((item) => {
      return item.sku === sku;
    });
  }

  update(productIndex: number, data: IProduct): IProduct {
    this.productsDatabase[productIndex] = data;
    return data;
  }

  remove(sku: number): void {
    this.productsDatabase = this.productsDatabase.filter(function (obj) {
      return obj.sku !== sku;
    });
  }

  checkExists(sku: number): number | null {
    if (this.productsDatabase.some((el) => el.sku === sku)) {
      return sku;
    }

    return null;
  }

  getProductIndex(sku: number): number {
    return this.productsDatabase.findIndex((item) => item.sku === sku);
  }
}

export const product = new ProductModel();
