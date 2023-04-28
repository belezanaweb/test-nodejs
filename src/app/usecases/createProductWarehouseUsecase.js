module.exports = ({ productWarehouseRepository }) => ({
  execute: async (data) => {
    const response = await productWarehouseRepository.create(data);
    return response;
  }
});
