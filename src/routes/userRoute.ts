import express from 'express';
const router = express.Router();

import User from '../models/User';

// Creating a user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        console.log(user);
        await user.save();
        res.json({ user });
    } catch (e) {
        console.log(e);
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ users });
});

export default router;
