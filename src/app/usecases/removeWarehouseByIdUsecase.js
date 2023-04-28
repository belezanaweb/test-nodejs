module.exports = ({ warehouseRepository }) => ({
  execute: async (data) => {
    const response = await warehouseRepository.removeById(data);
    return response;
  }
});
