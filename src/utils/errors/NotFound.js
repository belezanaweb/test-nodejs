class NotFound extends Error {
    constructor(message) {
        super();
        this.message = message || "No data found";
        this.id_error = 0;
    }
}

module.exports = NotFound;