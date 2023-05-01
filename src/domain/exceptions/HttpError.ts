export default abstract class HttpError extends Error {
  code: number;

  protected constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = this.constructor.name,
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
