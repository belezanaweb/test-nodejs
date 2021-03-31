exports.newProduct = async (product) => {
  if (product.sku === undefined) {
    throw new Error('Sku is mandatory, please verify.');
  }

  if (product.inventory === undefined) {
    throw new Error('No inventory found');
  }

  if (
    product.inventory.warehouses === undefined ||
    !Array.isArray(product.inventory.warehouses) ||
    product.inventory.warehouses.length < 1
  ) {
    throw new Error('No wharehouses founded');
  }

  for (const whareshouse of product.inventory.warehouses) {
    if (whareshouse.quantity === undefined) {
      throw new Error('No wharehouses quantity');
    }
  }
};
