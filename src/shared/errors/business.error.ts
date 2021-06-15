export interface IBusinesError {
  httpCode: number;
  name: string;
  message?: any;
  items?: any;
}

export interface IError {
  status: number;
  name: string;
  items?: any;
}

export class BusinessError implements IBusinesError {
  httpCode: number;
  name: string;
  message?: any;
  items?: any;

  constructor(error: IError, message?: any) {
    this.httpCode = error.status;
    this.name = error.name;
    this.items = error.items;
    this.message = message;
  }

  toJSON(): IBusinesError {
    return {
      httpCode: this.httpCode,
      name: this.name,
      message: this.message,
      items: this.items,
    };
  }
}

export const ERRORS = {
  DUPLICATED_IDENTIFIER: {
    status: 400,
    name: 'DUPLICATED_IDENTIFIER',
  },
  BAD_REQUEST: {
    status: 400,
    name: 'BAD_REQUEST',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    name: 'INTERNAL_SERVER_ERROR',
  },
  INVALID_SCHEMA: {
    status: 400,
    name: 'INVALID_SCHEMA',
  },
};
