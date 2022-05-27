import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup'

export default (shape: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Yup
      .object()
      .shape(shape)
      .validate(req.body, { abortEarly: false });  
    return next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.errors })
  }
};