module.exports = ({ createProductUsecase, createWarehouseUsecase, bindingProductWarehouse, removeProductByIdUsecase }) => ({
  execute: async (data) => {
    let productId;
    try {
      const { warehouse } = data;
      const product = await createProductUsecase.execute(data);
      if (!product) {
        return;
      }
      productId = product.id;

      if (warehouse) {
        const warehouseCretead = await Promise.all(warehouse.map((element) => createWarehouseUsecase.execute(element)));
        await bindingProductWarehouse.execute(productId, warehouseCretead);
      }
      return product;
    } catch (error) {
      await removeProductByIdUsecase.execute(productId);
      return error;
    }
  }
});
