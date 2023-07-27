import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src/app';
import User from '../../src/models/User';
import connectTestDb from '../../src/utils/connectTestDb';
import * as userServices from '../../src/services/user.services';
import { cookie } from '../../src/utils/';

const userOneObj = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john12345',
};

beforeEach(async () => {
    await connectTestDb();
    await User.deleteMany();
});
afterAll((done) => {
    mongoose.connection.close();
    done();
});

describe('Register controller', () => {
    describe('given user already exist', () => {
        beforeEach(async () => {
            await userServices.createUser(userOneObj);
        });

        it('should return a 401', async () => {
            await request(app).post('/users/register').send(userOneObj).expect(401);
        });
        it('should have error in the res', async () => {
            const { body } = await request(app)
                .post('/users/register')
                .send(userOneObj)
                .expect(401);
            expect(body.errors).toBeDefined();
            expect(body.errors).toHaveLength(1);
        });
    });

    describe('given user is actually new', () => {
        it('should call all the necessary functions', async () => {
            const findByEmail = jest.spyOn(userServices, 'findByEmail');
            await request(app).post('/users/register').send(userOneObj).expect(201);

            expect(findByEmail).toHaveBeenCalled();
        });
        it('should call createUser', async () => {
            const createUser = jest.spyOn(userServices, 'createUser');
            await request(app).post('/users/register').send(userOneObj).expect(201);
            expect(createUser).toHaveBeenCalled();
        });
        it('should call setAuthCookie', async () => {
            const setAuthCookie = jest.spyOn(cookie, 'setAuthCookie');
            await request(app).post('/users/register').send(userOneObj).expect(201);
            expect(setAuthCookie).toHaveBeenCalled();
        });
        it('should send a user and a token', async () => {
            const { body } = await request(app)
                .post('/users/register')
                .send(userOneObj)
                .expect(201);
            expect(body.token).toBeDefined();
            expect(body.token).not.toBeNull();
            expect(body.user).toBeDefined();
        });
        it('should return a 201 status', async () => {
            await request(app).post('/users/register').send(userOneObj).expect(201);
        });
    });
});
describe('Login controller', () => {
    describe('given user exist', () => {
        beforeEach(async () => {
            await userServices.createUser(userOneObj);
        });

        it('should have error in the res', async () => {
            const { body } = await request(app)
                .post('/users/register')
                .send(userOneObj)
                .expect(401);
            expect(body.errors).toBeDefined();
            expect(body.errors).toHaveLength(1);
        });

        it('should return a 200', async () => {
            await request(app).post('/users/login').send(userOneObj).expect(200);
        });
    });

    describe('given user is actually new', () => {
        beforeEach(async () => {
            await connectTestDb();
            await User.deleteMany();
        });
        afterAll((done) => {
            mongoose.connection.close();
            done();
        });

        it('should call all the necessary functions', async () => {
            const findByEmail = jest.spyOn(userServices, 'findByEmail');
            await request(app).post('/users/register').send(userOneObj).expect(201);

            expect(findByEmail).toHaveBeenCalled();
        });
        it('should call createUser', async () => {
            const createUser = jest.spyOn(userServices, 'createUser');
            await request(app).post('/users/register').send(userOneObj).expect(201);
            expect(createUser).toHaveBeenCalled();
        });
        it('should call setAuthCookie', async () => {
            const setAuthCookie = jest.spyOn(cookie, 'setAuthCookie');
            await request(app).post('/users/register').send(userOneObj).expect(201);
            expect(setAuthCookie).toHaveBeenCalled();
        });
        it('should send a user and a token', async () => {
            const { body } = await request(app)
                .post('/users/register')
                .send(userOneObj)
                .expect(201);
            expect(body.token).toBeDefined();
            expect(body.token).not.toBeNull();
            expect(body.user).toBeDefined();
        });
        it('should return a 201 status', async () => {
            await request(app).post('/users/register').send(userOneObj).expect(201);
        });
    });
});
