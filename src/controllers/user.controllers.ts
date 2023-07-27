import { Request, Response } from 'express';

import User from '../models/User';
import { IUserDocument } from '../models/User.types';
import UserAuthError from '../errors/UserAuthError';
import { RequestWithUser } from '../routes/user.route.types';
import {
    createUser,
    findByCredentials,
    findByEmail,
    generateAuthToken,
} from '../services/user.services';
import { cookie } from '../utils';
import save from '../utils/save';

// Register user
export const register = async (
    req: Request,
    res: Response<{ token: string; user: IUserDocument }>,
) => {
    //   Check whether user already exist
    const previousUser = await findByEmail(req.body.email);
    if (previousUser) throw new UserAuthError('User already exist');

    // Create new User if user does not exist
    const user = await createUser(req.body);
    // Generate token for auth
    const token = await generateAuthToken(user);
    // Save the user
    await save(user);

    // Set cookies in token
    cookie.setAuthCookie(res, token);
    res.status(201).json({
        token,
        user,
    });
};

// Login user
// @return { token, user}
export const login = async (
    req: Request,
    res: Response<{ token: string; user: IUserDocument }>,
) => {
    // Find user by credentials
    const user = await findByCredentials(req.body);

    if (user === null) throw new UserAuthError('Invalid credentials');

    // Generate token for that user
    const token = await generateAuthToken(user);
    cookie.setAuthCookie(res, token);

    res.json({ token, user });
};

// Get user with cookies
// @return { token, user}
export const getMe = (req: RequestWithUser, res: Response) => {
    const { token, user } = req;
    res.status(200).json({ token, user });
};

// Delete self
// @return {user}
export const deleteMe = async (req: RequestWithUser, res: Response) => {
    const user = req.user;
    user && (await user.remove());
    cookie.clearAuthCookie(res);
    res.json({ user });
};

// Logout user
// @return a status code 200
export const logout = () => async (req: RequestWithUser, res: Response) => {
    await req.user?.removeToken(req.token as string);
    // Clear cookies from the browser
    cookie.clearAuthCookie(res);
    res.sendStatus(200);
};

// Get all users
// @return users[]
export const getAllUsers = async (req: RequestWithUser, res: Response<IUserDocument[]>) => {
    const users = await User.find();
    res.send(users);
};

// Get the total number of users
// @returns a number
export const countUsers = async (req: RequestWithUser, res: Response<{ count: number }>) => {
    const count = await User.countDocuments();
    res.json({ count });
};

// Delete users
// @return deleteCount: number;
export const deleteUsers = async (req: RequestWithUser, res: Response<number>) => {
    const { ids } = req.body;
    const { deletedCount } = await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json(deletedCount);
};
