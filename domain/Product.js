module.exports = class Product {
  constructor() {
    this.productsDatabase = [];
    this.productGargabe = [];
  }

  /**
   *  CREATE DOCUMENT
   * @param {*} product
   * @returns string
   */
  async create(product) {
    const index = this.findProductIndex(product.sku);

    if (index >= 0) {
      return `Product (sku): ${product.sku} already exists.`;
    }

    this.productsDatabase.push(product);
    console.log(product);
    return `Product (sku): ${product.sku} created succesfuly`;
  }

  /**
   *  DELETE DOCUMENT
   * @param {*} product
   * @returns string
   */
  async delete(sku) {
    const index = this.productsDatabase.findIndex((product) => product.sku === sku);

    if (index < 0) {
      return undefined;
    }

    this.productsDatabase.splice(index, 1);
    return `Product (sku): ${sku} deleted succesfuly`;
  }

  /**
   *  UPDATE DOCUMENT
   * @param {*} product
   * @returns string
   */
  async update(sku, updatedProduct) {
    const index = this.productsDatabase.findIndex((product) => product.sku === sku);

    if (index < 0) {
      return undefined;
    }
    this.productsDatabase[index] = updatedProduct;
    return `Product (sku): ${this.productsDatabase[index].sku} updated succesfuly`;
  }

  /**
   *  GET DOCUMENT
   * @param {*} product
   * @returns string
   */
  async get(sku) {
    const index = this.findProductIndex(sku);
    return this.productsDatabase[index];
  }

  /**
   *  FIND DOCUMENT INDEX
   *  Find exists .
   * @param {*} product
   * @returns string
   */
  findProductIndex(sku) {
    const index = this.productsDatabase.findIndex((product) => product.sku === sku);
    return index;
  }
};
