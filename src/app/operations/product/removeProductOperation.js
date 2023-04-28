module.exports = ({
  removeProductBySkuUsecase,
  findProductBySkuUsecase,
  removeWarehouseByIdUsecase,
  findProductWarehouseByProductIdUsecase,
  removeProductWareseByProductIdUsecase,
  exceptions
}) => ({
  execute: async (data) => {
    const product = await findProductBySkuUsecase.execute(data);
    if (!product) {
      throw exceptions.notFoundError('[findProductBySkuUsecase] product is not found');
    }
    const { id, sku } = product;
    const productWarehouse = await findProductWarehouseByProductIdUsecase.execute(id);
    if (!productWarehouse || productWarehouse.length === 0) {
      throw exceptions.notFoundError('[findProductWarehouseByProductIdUsecase] bind product and warehouse not found');
    }
    const productWarehouseIsRemoved = await removeProductWareseByProductIdUsecase.execute(id);
    if (!productWarehouseIsRemoved) {
      throw exceptions.internalError('[removeProductWareseByProductIdUsecase]');
    }

    const productIsRemoved = await removeProductBySkuUsecase.execute(sku);
    if (!productIsRemoved) {
      throw exceptions.internalError('[removeProductBySkuUsecase]');
    }

    const warehouseIsRemoved = await Promise.all(productWarehouse.map((item) => removeWarehouseByIdUsecase.execute(item.warehouseId)));
    if (!warehouseIsRemoved) {
      throw exceptions.internalError('[removeWarehouseByIdUsecase]');
    }

    return productIsRemoved;
  }
});
