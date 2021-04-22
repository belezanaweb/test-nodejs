class InvalidFields extends Error {
    constructor(fields) {
        super();
        this.message = "Invalid Fields";
        this.fields = fields;
        this.id_error = 2;
    }
}

module.exports = InvalidFields;