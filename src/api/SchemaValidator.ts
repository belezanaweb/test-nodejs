import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

const SchemaValidator = (yupSchema: yup.AnySchema) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      await yupSchema.validate(request.body, { abortEarly: false, strict: false, stripUnknown: true});
      return next()
    }
    catch(error){
      return response.status(400).json(error.errors);
    }
  };
};


export default SchemaValidator
