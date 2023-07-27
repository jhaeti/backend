import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';

import connectDb from '../../src/utils/connectDb';

describe('Database connection', () => {
    afterAll((done) => {
        mongoose.connection.close();
        done();
    });
    describe('given uri is not valid', () => {
        it('should have connection ready state of 1', async () => {
            await request(app);
            await connectDb('some_wrong_uri');
            expect(mongoose.connection.readyState).toBe(0);
        });
    });
    describe('given uri is valid', () => {
        it('should have connection ready state of 1', async () => {
            await request(app);
            const uri = process.env.MONGO_TEST_URI as string;
            await connectDb(uri);
            expect(mongoose.connection.readyState).toBe(1);
        });
    });
});
