module.exports = ({ warehouseRepository }) => ({
  execute: async (data) => {
    const response = await warehouseRepository.create(data);
    return response;
  }
});
