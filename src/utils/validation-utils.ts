import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { BadRequestResponse } from '../controller/dtos';

export class ValidationUtils {

    static validate(validations: any[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }

            const response: BadRequestResponse[] = errors.array().map(e => {
                return {
                    location: e.location,
                    field: e.param,
                    errorMessage: e.msg
                }
            })

            res.status(400).json(response);
        };
    }
}
