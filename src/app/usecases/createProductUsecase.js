module.exports = ({ productRepository, exceptions }) => ({
  execute: async (data) => {
    try {
      const response = await productRepository.create(data);
      return response;
    } catch (error) {
      throw exceptions.internalError(JSON.stringify(error.errors));
    }
  }
});
