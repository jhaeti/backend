import { Request } from 'express';

import { IUserDocument } from '../models/User.types';

export interface RequestWithUser extends Request {
    user?: IUserDocument;
    token?: string;
}
