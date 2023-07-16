import ApplicationError from "./ApplicationError";

export default class DuplicateError extends ApplicationError {
  constructor(message = "Item already exists") {
    super(message);
  }
}
