class AplicationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) return 400;

    if (this instanceof NotFound) return 404;

    if (this instanceof Conflict) return 409;

    return 500;
  }
}

// TODO - create specific errors
class BadRequest extends AplicationError { }
class NotFound extends AplicationError { }
class Conflict extends AplicationError { }

module.exports = {
  AplicationError,
  BadRequest,
  NotFound,
  Conflict
};
