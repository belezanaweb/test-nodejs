module.exports = ({ internalServerError: InternalServerError, notFoundError: NotFoundError, badRequestError: BadRequestError }) => ({
  internalError: (details) => {
    const error = new InternalServerError(details);
    return {
      status: 500,
      body: error.name
    };
  },

  notFound: (details) => {
    const error = new NotFoundError(details);
    return {
      status: 500,
      body: error.name
    };
  },

  badRequest: (details) => {
    const error = new BadRequestError(details);
    return {
      status: 500,
      body: error.name
    };
  }
});
