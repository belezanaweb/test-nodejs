import { isNull } from "../utils/commonsValidator.js";
import ErrorResponse from "../utils/errorResponse.js";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const errorResponseUtils = (statusCode, error) => {
  const message = !isNull(error.message) ? error.message : error;
  return {
    statusCode,
    headers,
    body: JSON.stringify(new ErrorResponse(message)),
  };
};
