import { HydratedDocument, Model, Types } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    date?: Date;
    tokens?: { token: string }[];
    role: 'admin' | 'basic';
}

// Put all user instance methods in this interface
export interface IUserMethods {
    toJson(): Omit<IUser, 'password'> & { _id: Types.ObjectId };
    generateAuthToken(): Promise<string>;
    removeToken(token: string): Promise<void>;
}

export type IUserDocument = HydratedDocument<IUser, IUserMethods>;

// Put all user static methods in this interface
export interface UserModel extends Model<IUser, unknown, IUserMethods> {
    findByCredentials(email: string, password: string): Promise<IUserDocument>;
}
