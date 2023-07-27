import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateBody =
    (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.parseAsync(req.body);
        req.body = result;
        next();
    };

export default validateBody;
