module.exports = ({ createProductUsecase, createWarehouseUsecase, bindingProductWarehouse }) => ({
  execute: async (data) => {
    const { warehouse } = data;
    const product = await createProductUsecase.execute(data);
    if (!product) {
      return;
    }
    if (warehouse) {
      const warehouseCretead = await Promise.all(warehouse.map((element) => createWarehouseUsecase.execute(element)));
      // TODO: validate warehouseCreated
      await bindingProductWarehouse.execute(product.id, warehouseCretead);
    }
    return product;
  }
});
