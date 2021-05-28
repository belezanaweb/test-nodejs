class SkuReferenceError extends Error {
    constructor(args){
        super(args);
        this.name = "SkuReferenceError"
    }
}

module.exports = SkuReferenceError