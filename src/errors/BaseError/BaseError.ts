export abstract class BaseError extends Error {
  constructor(message: string, public errorCode: number) {
    super(message);
  }
}