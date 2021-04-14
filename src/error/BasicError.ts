
export class BasicError extends Error {
    constructor(message: string, public errorCode: number) {
      super(message);
    }
  }