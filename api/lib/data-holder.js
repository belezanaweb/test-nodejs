
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
        reject(new Error(`Duplicated entry: Product ${product.sku} alread exists`));
      }

      resolve(upsert(product));
    });
  },
  read(sku) {
    return new Promise((resolve, reject) => {
      if (!collection[sku]) {
        reject(new Error(`PRODUCT ${sku} NOT FOUND`));
      }

      resolve(collection[sku]);
    });
  },
  paginate(offset, limit) {
    return Promise.resolve(collection.filter((_, i) => ((i >= offset) && (i < offset + limit))));
  },
  update(sku, data) {
    return new Promise((resolve, reject) => {
      if (!collection[sku]) {
        reject(new Error(`PRODUCT ${sku} NOT FOUND`));
      }

      let product = {
        ...data,
        sku
      };

      resolve(upsert(product));
    });
  },
  delete(sku) {
    return Promise.resolve(() => {
      delete collection[sku];
      return true;
    });
  },
}