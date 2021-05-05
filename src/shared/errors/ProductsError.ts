/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable max-classes-per-file */
import { AppError } from "./appError";

export namespace ProductsError {
  export class ProductExists extends AppError {
    constructor() {
      super("Produto já existe", 409);
    }
  }

  export class ProductNotExists extends AppError {
    constructor() {
      super("Produto não existe", 404);
    }
  }

  export class UnprocessableEntity extends AppError {
    constructor() {
      super("Não foi possivel processar a requisição", 422);
    }
  }
}
