import HTTP_STATUS_CODE from "../constants/httpStatusCode.js";

const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res
        .status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY)
        .json({ message: message });
    }
  };
};

export default middleware;
