module.exports = class Product {
  constructor() {
    console.log('Construiu ... =/');
    this.productsDatabase = [];
    this.productGargabe = [];
  }

  async create(product) {
    this.productsDatabase.push(product);
    console.log(product);
    return `Product (sku): ${product.sku} created succesfuly`;
  }
  async delete(sku) {
    const index = this.productsDatabase.findIndex((product) => product.sku === sku);
    console.log(index);

    if (index < 0) {
      return undefined;
    }

    this.productsDatabase.splice(index, 1);
    return `Product (sku): ${sku} deleted succesfuly`;
  }

  async update(updatedProduct) {
    const index = this.productsDatabase.findIndex((product) => product.sku === updatedProduct.sku);

    if (index < 0) {
      return undefined;
    }
    this.productsDatabase[index] = updatedProduct;
    return `Product (sku): ${this.productsDatabase[index].sku} updated succesfuly`;
  }

  async get(sku) {
    const result = this.productsDatabase.find((product) => product.sku === sku);
    return result;
  }
};

// const productsDatabase = [];

// exports.create = (product) =>{
//      this.productsDatabase.push(product);
//      console.log(product);
//      return `Product (sku): ${product.sku} created succesfuly`;
//    }

//    exports.get = async (sku) =>{
//      const result = this.productsDatabase.find((product) => product.sku === sku);
//      return result;
//    }
