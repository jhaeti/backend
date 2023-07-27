import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import CustomError from '../errors/CustomError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.errorCode).send({
            errorType: err.errorType,
            errors: err.serialiseErrors(),
            stack: !(process.env.NODE_ENV === 'production') ? err.stack : null,
        });
    } else if (err instanceof ZodError) {
        res.status(403).send({
            errorType: 'validation_error',
            errors: err.errors,
            stack: !(process.env.NODE_ENV === 'production') ? err.stack : null,
        });
    } else {
        res.status(500).send({
            errorType: 'server_based_error',
            errors: [{ message: err.message }],
            stack: !(process.env.NODE_ENV === 'production') ? err.stack : null,
        });
    }

    next();
};

export default errorHandler;
