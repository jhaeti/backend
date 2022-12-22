// const bcrypt = require('bcryptjs');
import mongoose from 'mongoose';
// const jwt = require('jsonwebtoken');

// Creating User Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Method on the User collection to find a user by accepting email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new Error('User does not exist');
    }
    // Send user if there is no errors
    return user;
};

const User = mongoose.model('User', userSchema);

export default User;
