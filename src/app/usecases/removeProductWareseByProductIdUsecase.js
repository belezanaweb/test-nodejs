module.exports = ({ productWarehouseRepository }) => ({
  execute: async (data) => {
    const response = await productWarehouseRepository.removeByProductId(data);
    return response;
  }
});
