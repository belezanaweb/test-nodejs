import { Request, Response, NextFunction } from "express";
import { GenericErrorResponse } from "../controller/dtos";

export class ErrorHandler {

    public static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        let errorMessage = err.message;
        if(err['response'] && (err['response'] as unknown)['data']){
            errorMessage = (err['response'] as unknown)['data'];
        }
        let error: GenericErrorResponse = {
            errorMessage: errorMessage,
            path: req.url,
        }
        res.status(err['status'] ? err['status'] : 500);
        res.send(error);
        res.end();
    }

}