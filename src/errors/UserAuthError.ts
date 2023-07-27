import CustomError from './CustomError';

class UserAuthError extends CustomError {
    errorCode = 401;
    errorType = 'USER_AUTH_ERROR';
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UserAuthError.prototype);
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

export default UserAuthError;
