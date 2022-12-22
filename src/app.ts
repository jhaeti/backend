import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import './db';

// Api routes
import UserApi from './routes/userRoute';

const app = express();

app.use(express.json());

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
app.use(UserApi);

export default app;
