class BadRequestError extends Error {
  constructor(details) {
    super(`Bad Request ${details}`);
    this.name = 'BadRequestError';
  }
}
module.exports = () => BadRequestError;
