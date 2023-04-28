module.exports = ({ productRepository }) => ({
  execute: async (data) => {
    const response = await productRepository.findBySku(data);
    return response;
  }
});
