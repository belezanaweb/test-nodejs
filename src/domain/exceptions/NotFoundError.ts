import httpStatus from "http-status";
import HttpError from "./HttpError";

export default class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}
