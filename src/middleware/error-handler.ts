import { Request, Response, NextFunction } from "express";
import { GenericErrorResponse } from "../controller/dtos";

export class ErrorHandler {

    public static handle(err: Error, req: Request, res: Response, next: NextFunction): void {    
        let error: GenericErrorResponse = {
            errorMessage: err.message,
            path: req.url,
        }
        res.status(err['status'] ? err['status'] : 500);
        res.send(error);
        res.end();
    }

}