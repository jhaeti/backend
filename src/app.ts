import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import 'express-async-errors';
dotenv.config();

import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';
// Api routes
import userApi from './routes/user.route';
import productApi from './routes/product.route';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Accept cross-origin-request
app.use(
    cors({
        origin: 'true',
        credentials: true,
    }),
);
// Logging all request to the server console
app.use(morgan('dev'));

// Using routes
app.use('/users', userApi);
app.use('/products', productApi);

app.get('/', (req: Request, res: Response<{ message: 'Server is up and running...' }>) => {
    res.json({
        message: 'Server is up and running...',
    });
});

app.get('*', (_req: Request, _res: Response) => {
    throw new NotFoundError('The request could not be handled.');
});

app.use('*', errorHandler);

export default app;
