import { BaseError } from "./BaseError/BaseError";

export class GenericError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
