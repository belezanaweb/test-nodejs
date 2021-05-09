import { getProductParser } from './product.parser';
import { ProductError } from './product.error';
import { IProduct } from './product.interface';

export class ProductService {
  private products: IProduct[] = [];

  constructor(private readonly productError: ProductError) {}

  create(product: IProduct) {
    this.throwErrorIfProductAlreadyExists(product.sku);
    this.products.push(product);
    return product;
  }

  update(sku: number, body: IProduct) {
    const productIndex = this.findIndexBySku(sku);
    this.throwErrorIfNotFound(this.products[productIndex]);

    if (sku !== body.sku) {
      this.throwErrorIfProductAlreadyExists(body.sku);
    }

    this.products[productIndex] = body;
    return body;
  }

  delete(sku: number) {
    this.products = this.products.filter(product => product.sku !== sku);
  }

  getAll() {
    return this.products.map(product => getProductParser(product));
  }

  getBySku(sku: number) {
    const product = this.findBySku(sku);
    this.throwErrorIfNotFound(product);
    return getProductParser(product);
  }

  findBySku(sku: number) {
    return this.products.find(p => p.sku === sku)!;
  }

  findIndexBySku(sku: number) {
    return this.products.findIndex(p => p.sku === sku);
  }

  throwErrorIfProductAlreadyExists(sku: number) {
    const productAlreadyExists = this.findBySku(sku);

    if (productAlreadyExists) {
      this.productError.productAlreadyExists();
    }
  }

  throwErrorIfNotFound(product?: IProduct) {
    if (!product) {
      this.productError.notFound();
    }
  }
}