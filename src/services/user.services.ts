import User from '../models/User';
import { IUserDocument } from '../models/User.types';
import { LoginSchema, RegisterSchema } from '../schemas/user.schemas';

export const createUser = async (input: RegisterSchema) => {
    const user = new User(input).save();
    return user;
};

export const findByCredentials = async ({ email, password }: LoginSchema) => {
    const user = await User.findByCredentials(email, password);
    return user;
};

export const findById = async (id: string) => {
    const user = await User.findById(id);
    return user;
};

export const findByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
};

export const generateAuthToken = async function (user: IUserDocument) {
    const token = await user.generateAuthToken();
    return token as string;
};
