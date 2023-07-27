import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserAuthError from '../errors/UserAuthError';
import TestError from '../errors/UserAuthError';

import { RequestWithUser } from '../routes/user.route.types';
import { findById } from '../services/user.services';
import { cookie } from '../utils';
const validateUser = () => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // Get token from cookies
    const token: string = await cookie.getAuthToken(req);
    if (!token) throw new UserAuthError('No token, authorization denied');
    // Verify the token if it exist
    const _id = verify(token, process.env.JWT_SECRET_KEY);
    // Find user with decoded token if token is verified
    const user = await findById(_id as string);
    // Check to see if user exist
    if (!user) {
        throw new TestError('User does not exist');
    }
    req.user = user;
    req.token = token;
    next();
};

export default validateUser;
