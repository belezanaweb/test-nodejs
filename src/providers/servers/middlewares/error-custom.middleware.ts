import { NextFunction, Request, Response } from "express";
import { ErrorCustom } from "../../../utils/error-custom.util";

const errorCustom = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorCustom) {
    const objCustom = JSON.parse(err.message);
    return res.status(objCustom.code).json({
      error: objCustom.error
    });
  }

  console.log(err);
  return res.status(500).json({
    error: 'Internal Server error'
  })
}

export { errorCustom }
