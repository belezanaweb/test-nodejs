import ApplicationError from './ApplicationError';

class DuplicateError extends ApplicationError {
    constructor(message = 'Item already exists') {
        super(message, 409);
    }
}

export default DuplicateError;