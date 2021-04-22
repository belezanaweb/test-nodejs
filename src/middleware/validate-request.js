const BadRequest = require('../utils/errors/BadRequest');
const resp = require('../utils/response');

module.exports = (req, res, next) => {
    try {
        let content_type = req.headers['content-type'];

        if (content_type == undefined) {
            req.headers['content-type'] = "application/json";
            next();
        } else if (content_type == "application/json") {
            next();
        } else {
            resp.sendError(res, "", new BadRequest());
        }
    } catch {
        resp.sendError(res, "", new BadRequest());
    }
  };