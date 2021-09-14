export class ErrorCustom {
  public message: String;

  constructor(obj: { code: number, error: string }) {
    this.message = JSON.stringify(obj);
  }
}
