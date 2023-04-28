module.exports = ({ createProductUsecase }) => ({
  execute: async (data) => {
    const response = await createProductUsecase.execute(data);
    return response;
  }
});
