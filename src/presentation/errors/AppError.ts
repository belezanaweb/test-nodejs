import HttpStatusCodes from 'http-status-codes';

export default class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatusCodes.BAD_REQUEST) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}
