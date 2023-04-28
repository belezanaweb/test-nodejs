module.exports = ({ productWarehouseRepository }) => ({
  execute: async (data) => {
    const response = await productWarehouseRepository.findAllByProductId(data);
    return response;
  }
});
