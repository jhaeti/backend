import { Response, NextFunction } from 'express';
import TestError from '../errors/UserAuthError';
import { RequestWithUser } from '../routes/user.route.types';

const restrictToAdmin = () => (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user && req.user.role !== 'admin') throw new TestError('Unauthorized');
    next();
};

export default restrictToAdmin;
