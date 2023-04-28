module.exports = ({ productRepository }) => ({
  execute: async (data) => {
    const response = await productRepository.create(data);
    return response;
  }
});
