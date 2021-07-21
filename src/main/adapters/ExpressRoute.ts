import {
    Request,
    Response,
} from 'express';
import HttpStatusCodes from 'http-status-codes';
import { ValidationError } from 'joi';

import { AppError } from '../../presentation/errors';
import {
    IController,
    IHttpRequest,
} from '../../presentation/protocols';

function getErrorStatusCode(error: Error) {
  if (error instanceof AppError) return error.statusCode;
  if (error instanceof ValidationError) return HttpStatusCodes.BAD_REQUEST;

  return HttpStatusCodes.INTERNAL_SERVER_ERROR;
}

export default (controller: IController) => {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const httpRequest: IHttpRequest = {
                params: req.params,
                body: req.body
            };

            const httpResponse = await controller.handle(httpRequest);

            res
                .status(httpResponse.statusCode)
                .json(httpResponse.body);
        } catch (error) {
            const code = getErrorStatusCode(error);
            const data = {
                message: error.message || 'Please contact your system administrator.'
            };

            res
                .status(code)
                .json(data);
        }
    };
};
