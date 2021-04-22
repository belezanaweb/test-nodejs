class BadRequest extends Error {
    constructor() {
        super();
        this.message = "Invalid Request";
        this.id_error = 0;
    }
}

module.exports = BadRequest;