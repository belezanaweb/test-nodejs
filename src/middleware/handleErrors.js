const { AplicationError } = require("../utils/errors");

const handleErrors = (error, request, response, next) => {
  if (error instanceof AplicationError) {
    return response.status(error.getCode()).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: error.message
  });
};


module.exports = handleErrors;
