
const collection = {};
const upsert = product => {
  let quantity = 0;
  let warehouses = Array.isArray(product.inventory.warehouses) ?
    product.inventory.warehouses.map(warehouse => {
      quantity += warehouse.quantity;

      // return only warehouse valid properties 
      return {
        locality: warehouse.locality,
        quantity: warehouse.quantity,
        type: warehouse.type
      }
    }) :
    [];

  // insert only product valid properties
  collection[product.sku] = {
    sku: product.sku, 
    name: product.name, 
    inventory: {
      quantity, 
      warehouses,
    },
    isMarketable: (quantity > 0)
  };

  return collection[product.sku];
}

module.exports = {
  collection,
  create(product) {
    return new Promise((resolve, reject) => {
      if (collection[product.sku]) {
        return reject(new Error(`Duplicated entry: Product ${product.sku} alread exists`));
      }

      resolve(upsert(product));
    });
  },
  read(sku) {
    return new Promise((resolve, reject) => {
      if (!collection[sku]) {
        return reject(new Error(`PRODUCT ${sku} NOT FOUND`));
      }

      resolve(collection[sku]);
    });
  },
  list() {
    return new Promise(resolve => {
      const list = [];

      for (let key in collection) {
        list.push(collection[key]);
      }

     resolve(list);
    });
  },
  update(sku, data) {
    return new Promise((resolve, reject) => {
      if (!collection[sku]) {
        return reject(new Error(`PRODUCT ${sku} NOT FOUND`));
      }

      delete data.sku;

      let product = {
        ...data,
        sku
      };

      resolve(upsert(product));
    });
  },
  delete(sku) {
    return new Promise((resolve, reject) => {
      if (!collection[sku]) {
        return reject(new Error(`PRODUCT ${sku} NOT FOUND`));
      }

      delete collection[sku];
      resolve(`Deleted product ${sku}`);
    });
  },
}