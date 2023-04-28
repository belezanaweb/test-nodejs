module.exports = ({ productRepository }) => ({
  execute: async (data) => {
    const response = await productRepository.removeById(data);
    return response;
  }
});
