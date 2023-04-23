class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code: string;

  public readonly name: string;

  public readonly trace: string;

  constructor(
    message: string,
    trace = 'default',
    statusCode = 400,
    code = '0001',
    name = 'INTERNAL_SERVER_ERROR',
  ) {
    super();
    this.message = message;
    this.trace = trace;
    this.statusCode = statusCode;
    this.code = code;
    this.name = name;
  }
}

export default AppError;
