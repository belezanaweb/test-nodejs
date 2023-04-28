module.exports = ({ internalServerError: InternalServerError }) => ({
  internalError: (details) => {
    const error = new InternalServerError(details);
    return {
      status: 500,
      body: error.name
    };
  }
});
