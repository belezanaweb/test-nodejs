import httpStatus from "http-status";
import HttpError from "./HttpError";

export default class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}
