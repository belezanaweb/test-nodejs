
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

      let result = upsert(product);
      resolve(result);
    });
  },
  read(sku, cb) {
    return collection[sku];
  },
  paginate(offset, limit, cb) {
    let result = collection.filter((_, i) => ((i >= offset) && (i < offset + limit)));

    return cb(null, result);
  },
  update(sku, data) {
    if (!collection[sku]) {
      throw new Error(`PRODUCT ${sku} NOT FOUND`);
    }

    data.sku = sku;
    upsert(data);
    return data;
  },
  delete(sku) {
    delete collection[sku];
    return true;
  },
}