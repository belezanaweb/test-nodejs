import { Request, Response, NextFunction } from "express";
import { IValidator } from "../interfaces/validator";
import { StatusCodes } from "http-status-codes";

class Validator {
  static schema: IValidator;

  static validate(schema: IValidator) {
    return this.makeValidation.bind(schema);
  }

  static makeValidation(req: Request, res: Response, next: NextFunction) {
    const errors = [];
    const schema = this;

    Object.keys(schema).map((key) => {
      const { error } = schema[key].validate(req[key]);

      if (error) errors.push({ type: `${key} validation`, error });

      return key;
    });

    if (errors.length === 0) {
      return next();
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation Error", errors });
  }
}

export { Validator };
