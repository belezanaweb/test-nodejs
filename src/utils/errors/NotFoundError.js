import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError {
    constructor(message = 'Not found') {
        super(message, 404);
    }
}

export default NotFoundError;