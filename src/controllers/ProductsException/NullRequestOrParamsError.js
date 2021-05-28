class NullRequestOrParamsError extends Error {
    constructor(args)
    {
        super(args);
        this.Name = "NullRequestOrParamsError";
    }
}

module.exports = NullRequestOrParamsError;