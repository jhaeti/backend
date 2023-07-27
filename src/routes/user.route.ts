import { Router } from 'express';

import * as userController from '../controllers/user.controllers';
import restrictToAdmin from '../middleware/restrictToAdmin';

import validateUser from '../middleware/validateUser';
import validateBody from '../middleware/validateBody';
import { RegisterSchema, LoginSchema } from '../schemas/user.schemas';

const router = Router();

// Register Route
// @return { token, user}

router.post('/register', validateBody(RegisterSchema), userController.register);

// Login Route
// @return { token, user}
router.post('/login', validateBody(LoginSchema), userController.login);

// Getting user just from having correct cookies set
// @return { token, user}
router.get('/me', validateUser, userController.getMe);

// Delete self from the database
// @return {user}
router.delete('/me', validateUser, userController.deleteMe);

// Handling Logout functionality
// @return a status code 200
router.get('/logout', validateUser, userController.logout);

// Get all user from the database
router.get('/', validateUser, restrictToAdmin, userController.getAllUsers);

// Count number of Users in database
// @returns a number
router.get('/count', validateUser, restrictToAdmin, userController.countUsers);

// Delete any user by their id
// This is only accessible only by admins
router.delete('/', validateUser, restrictToAdmin, userController.deleteUsers);

export default router;
