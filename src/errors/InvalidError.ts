import ApplicationError from "./ApplicationError";

export default class InvalidError extends ApplicationError {
  constructor(message = "Invalid data") {
    super(message);
  }
}
