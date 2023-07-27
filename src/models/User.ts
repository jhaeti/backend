import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { IUser, IUserMethods, UserModel } from './User.types';
import UserAuthError from '../errors/UserAuthError';

// Creating User Model
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'basic',
        enum: ['admin', 'basic'],
    },
});

// Virtual item field for the user
userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'owner',
});

// Ensures password and tokens are not snet to the client when when request about a user is made
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

// A method to simply generate a token for a user and saves it for future use
// Sends the just created token to be saved on the client
userSchema.methods.generateAuthToken = async function () {
    // Creating the token with jwt
    const token = sign(this.id, process.env.JWT_SECRET_KEY);
    this.tokens = [...this.tokens, { token }];
    await this.save();
    return token as string;
};

// Removes the current token on the browser from the database
userSchema.methods.removeToken = async function (token: string) {
    this.tokens = this.tokens.filter(
        (tokenObject: { token: string }) => tokenObject.token !== token,
    );
    await this.save();
};

// Method on the User collection to find a user by accepting email and password
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        return null;
    }

    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
        return null;
    }

    // Send user if there is no errors
    return user;
};

// This middleware function runs after a save method is called on a user
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    const salt = genSaltSync(8);
    const hash = hashSync(this.password, salt);
    this.password = hash;
    next();
});
const User = model<IUser, UserModel>('User', userSchema);

export default User;
