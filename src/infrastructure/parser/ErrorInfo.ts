import { INTERNAL_SERVER_ERROR } from "http-status";

import HttpError from "../../domain/exceptions/HttpError";

export function buildErrorInfo(
  error: HttpError | Error,
  errorCodeForNonHttpError: number = INTERNAL_SERVER_ERROR
): { errorMessage: string; code: number, stackTrace: string } {
  return {
    errorMessage: error.message,
    code: error instanceof HttpError ? error.code : errorCodeForNonHttpError,
    stackTrace: JSON.stringify(error.stack),
  }
}
