import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src/app';
import User from '../../src/models/User';
import {
    createUser,
    findById,
    findByCredentials,
    findByEmail,
    generateAuthToken,
} from '../../src/services/user.services';
import connectTestDb from '../../src/utils/connectTestDb';

const userOneObj = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john12345',
};
const wrongId = '63f213580b2a6b64e1003045';

const { name, email, password } = userOneObj;
const userOne = new User(userOneObj);

beforeEach(async () => {
    await connectTestDb();
    await User.deleteMany();
});
afterAll((done) => {
    mongoose.connection.close();
    done();
});

describe('Create user service', () => {
    describe('Given input valid', () => {
        it('should return user', async () => {
            await request(app);
            const user = await createUser(userOneObj);
            expect(user).toBeDefined();
        });
        it('should return a non null user object', async () => {
            await request(app);
            const user = await createUser(userOneObj);
            expect(user).not.toBeNull();
        });
        it('should save user in database', async () => {
            await request(app);
            const res1 = await createUser(userOneObj);
            const res2 = await User.findById(res1._id);
            expect(res2).toBeDefined();
            expect(res1.name).toBe(res2 && res2.name);
            expect(res1.email).toBe(res2 && res2.email);
            expect(res1.password).toBe(res2 && res2.password);
        });
    });
});

describe('Find by Credentials', () => {
    beforeEach(async () => {
        await createUser(userOneObj);
    });
    describe('given invalid credentials', () => {
        it('should return null', async () => {
            const user = await findByCredentials({ email, password: 'sdjk' });
            expect(user).toBeNull();
        });
    });

    describe('given valid credentials', () => {
        it('should return user', async () => {
            const user = await findByCredentials({ email, password });
            expect(user).toBeDefined();
            expect(user.name).toBe(userOneObj.name);
            expect(user.email).toBe(userOneObj.email);
        });
    });
});

describe('Find by ID', () => {
    let userId: string;
    beforeEach(async () => {
        await User.deleteMany();
        const user = await createUser(userOneObj);
        userId = user.id;
    });
    describe('given input is valid id', () => {
        it('should find a user', async () => {
            await request(app);
            const user = await findById(userId);
            expect(user).not.toBeNull();
            expect(user).toBeDefined();
            user && expect(user.name).toBe(name);
            user && expect(user.email).toBe(email);
        });
    });

    describe('given input is not valid', () => {
        it('return value should be null', async () => {
            const user = await findById(wrongId);
            expect(user).toBeNull();
        });
    });
});

describe('Find by Email', () => {
    beforeEach(async () => {
        await createUser(userOneObj);
    });

    describe('given email does not exist', () => {
        it('should return null', async () => {
            await request(app);
            const user = await findByEmail('something not an email');

            expect(user).toBeNull();
        });
    });
    describe('given email does exist', () => {
        it('should return user', async () => {
            await request(app);
            const user = await findByEmail(userOneObj.email);

            expect(user).toBeDefined();
        });
        it('should return a user that matches userOneObj', async () => {
            await request(app);
            const user = await findByEmail(userOneObj.email);

            expect(user && user.name).toBe(userOneObj.name);
            expect(user && user.email).toBe(userOneObj.email);
        });
    });
});

describe('Generate auth token', () => {
    describe('given input is a valid user', () => {
        it('should return a token', async () => {
            const user = await findByEmail(userOne.email);
            const token = user && (await generateAuthToken(user));
            expect(token).toBeDefined();
        });
    });
});
