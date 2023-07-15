import ApplicationError from './ApplicationError';

class InvalidDataError extends ApplicationError {
    constructor(message = 'Invalid data') {
        super(message, 400);
    }
}

export default InvalidErrorError;