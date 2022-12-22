import express from 'express';
const router = express.Router();

import User from '../models/User';

// Creating a user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ user });
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ users });
});
router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.json({ user });
    } catch (e) {
        res.sendStatus(400);
    }
});

export default router;
