module.exports = ({ createProductWarehouseUsecase }) => ({
  execute: async (productId, warehouseIds) => {
    const bind = [];
    if (Array.isArray(warehouseIds) === false) {
      const created = await createProductWarehouseUsecase.execute({ productId, warehouseIds });
      bind.push(created);
      return bind;
    }
    for (const { id } of warehouseIds) {
      const created = await createProductWarehouseUsecase.execute({ productId, warehouseId: id });
      bind.push(created);
    }
    return bind;
  }
});
