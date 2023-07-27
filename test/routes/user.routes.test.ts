import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import User from '../../src/models/User';
import connectTestDb from '../../src/utils/connectTestDb';
import * as userServices from '../../src/services/user.services';

const userOneObj = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john12345',
};

const { name, email, password } = userOneObj;

beforeEach(async () => {
    await connectTestDb();
    await User.deleteMany();
});
afterAll((done) => {
    mongoose.connection.close();
    done();
});
describe('User Register', () => {
    describe('Given request body is not valid', () => {
        it('should return a 403 status', async () => {
            await supertest(app).post('/users/register').send({}).expect(403);
        });
    });

    describe('Given request body is valid', () => {
        it('should return a 201 (created)', async () => {
            await supertest(app)
                .post('/users/register')
                .send({ name, email, password })
                .expect(201);
        });
    });
});

describe('User Login', () => {
    beforeEach(async () => {
        await userServices.createUser(userOneObj);
    });
    describe('Given request body is not valid', () => {
        it('should return a 403', async () => {
            await supertest(app).post('/users/login').send({}).expect(403);
        });
    });

    describe('Given request body is valid', () => {
        it('should return 200 (ok)', async () => {
            await supertest(app).post('/users/login').send({ email, password });
            expect(200);
        });
    });
});
