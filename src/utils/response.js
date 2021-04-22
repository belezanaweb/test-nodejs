
const BadRequest = require("./errors/BadRequest");
const InvalidFields = require("./errors/InvalidFields");
const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require("./errors/InvalidParameter");

class Response {
    constructor (){
        this.status = {
            //Sucesso
            SUCCESS: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            //Erros
            ERROR: 400,
            UNAUTHORIZED: 401,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500
        }
          
        Object.freeze(this.status)
    }

    //Senders

    sendSucess (res, message, data) {
        res.status(this.status.SUCCESS).json({ status: this.status.SUCCESS, message: message, data: data });
    }

    sendCreated (res, message, data) {
        res.status(this.status.CREATED).json({ status: this.status.CREATED, message: message, data: data });
    }

    sendUnauthorized (res, message) {
        res.status(this.status.UNAUTHORIZED).json({ status: this.status.UNAUTHORIZED, message: message, data: { auth: false } });
    }

    send(res, data) {
        res.status(data.status).json(data);
    }

    sendError (res, message, error) {
        let status = this.status.INTERNAL_SERVER_ERROR;
        let data = error;

        if (error instanceof BadRequest) {
            status = this.status.ERROR;
            message = error.message;
            data = null;

        } else if (error instanceof NotFound) {
            status = this.status.NOT_FOUND;
            data = { code: error.id_error, message: error.message };

        } else if (error instanceof InvalidParameter) {
            status = this.status.ERROR;
            data = { code: error.id_error, message: error.message };

        } else if (error instanceof InvalidFields) {
            status = this.status.ERROR;
            data = { code: error.id_error, message: error.message, detais: error.fields};

        } else if (error instanceof Error){
            data = { code: null, message: error.message };
        }

        res.status(status).json({ status: status, message: message, error: data });
    }
}

module.exports = new Response;