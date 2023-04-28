class NotFoundError extends Error {
  constructor(details) {
    super(`Not found ${details}`);
    this.name = 'NotFoundError';
  }
}
module.exports = () => NotFoundError;
