module.exports = ({ productRepository }) => ({
  execute: async (data) => {
    const response = await productRepository.removeBySku(data);
    return response;
  }
});
