import { Request, Response } from 'express';
import TestError from '../errors/UserAuthError';

// Get token from cookies
// Receive a cookieName and returns the token corresponding to that cookie
export const getAuthToken = async (req: Request) => {
    // Getting cookie from the req since it would be sent along with the request if present
    const token: string = req.cookies[process.env.AUTH_COOKIE_NAME];
    if (!token) throw new TestError('No token, authorization denied');
    return token;
};

// Clearing cookie from the browser
// Does not matter whether there exist a cookie with that name or not it simply clears cookies with the name
export const clearAuthCookie = (res: Response) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME);
};

// Store cookies in the browser for usage in future request
export const setAuthCookie = (res: Response, token: string) => {
    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
};
