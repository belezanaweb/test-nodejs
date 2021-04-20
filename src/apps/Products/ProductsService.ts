import { CustomError } from 'express-handler-errors';

import { Products } from './Products.entity';

class Productservice {
  // Database
  productsDB: Products[] = [];

  findProduct(sku: number) {
    const product = this.productsDB.find(product => product.sku === sku);
    return product;
  }

  handleQuantity(product: Products) {
    let quantity = 0;

    product.inventory.wharehouses.forEach(wharehouse => {
      if (wharehouse.quantity > 0) quantity += wharehouse.quantity;
    });

    if (quantity >= 1) {
      Object.assign(product, { isMarketable: true });
    }

    if (quantity <= 0) {
      Object.assign(product, { isMarketable: false });
    }

    Object.assign(product, { inventory: quantity });

    return product;
  }

  async create(product: Products): Promise<Products | undefined> {
    const foundProduct = this.findProduct(product.sku);

    if (foundProduct) {
      throw new CustomError({
        code: 'PRODUCT_ALREADY_EXIST',
        message: 'Este produto já foi cadastrado',
        status: 409,
      });
    }
    this.productsDB.push(product);
    return product;
  }

  async findOne(sku: number): Promise<Products | undefined> {
    const foundProduct = this.findProduct(sku);
    if (!foundProduct)
      throw new CustomError({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Produto não encontrado',
        status: 404,
      });

    return this.handleQuantity(foundProduct);
  }

  async update(sku: number, product: Products): Promise<Products | undefined> {
    const productIndex = this.productsDB.findIndex(
      product => product.sku === sku,
    );

    if (productIndex < 0)
      throw new CustomError({
        code: 'PRODUCT_NOT_EXIST',
        message: 'Produto não existe',
        status: 404,
      });

    this.productsDB[productIndex] = product;
    return this.productsDB[productIndex];
  }

  async delete(sku: number): Promise<void> {
    const foundProduct = this.findProduct(sku);
    if (!foundProduct)
      throw new CustomError({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Produto não encontrado',
        status: 404,
      });
    this.productsDB.splice(
      this.productsDB.findIndex(i => {
        return i.sku === foundProduct?.sku;
      }),
      1,
    );
  }
}

export default new Productservice();
