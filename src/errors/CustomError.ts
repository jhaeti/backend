abstract class CustomError extends Error {
    abstract errorCode: number;
    abstract errorType: string;
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serialiseErrors(): { message: string; errorType: string }[];
}

export default CustomError;
