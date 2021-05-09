export class CustomError extends Error {
  statusCode: number;

  constructor (message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
