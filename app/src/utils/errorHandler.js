import HTTP_STATUS_CODE from "../constants/httpStatusCode.js";

export default handlerError = (error, req, res, next) => {
  res.status(error.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};
