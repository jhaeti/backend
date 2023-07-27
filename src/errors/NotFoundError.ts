import CustomError from './CustomError';

class NotFoundError extends CustomError {
    errorCode = 404;
    errorType = 'not_found';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serialiseErrors() {
        return [
            {
                errorType: this.errorType,
                message: this.message,
            },
        ];
    }
}

export default NotFoundError;
