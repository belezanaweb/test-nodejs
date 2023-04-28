class InternalServerError extends Error {
  constructor(details) {
    super(`Internal Server Error ${details}`);
    this.name = 'InternalServerError';
  }
}
module.exports = () => InternalServerError;
