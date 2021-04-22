class InvalidParameter extends Error {
    constructor(parameter) {
        super();
        this.message = `Invalid parameter ${parameter}`;
        this.id_error = 1;
    }
}

module.exports = InvalidParameter;