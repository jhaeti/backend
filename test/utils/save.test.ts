import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src/app';
import Product from '../../src/models/Product';
import User from '../../src/models/User';
import save from '../../src/utils/save';
import { connectTestDb } from '../../src/utils';

const userOneObj = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john12345',
};

const productOneObj = {
    name: 'Product One',
    price: 10,
    quantity: 100,
    description: 'This is the best product i sell',
};

beforeEach(async () => {
    await connectTestDb();
    await User.deleteMany();
    await Product.deleteMany();
});
afterAll((done) => {
    mongoose.connection.close();
    done();
});

describe('Save documents', () => {
    describe('given object is a document', () => {
        it('should save new user', async () => {
            await request(app);
            const userOne = new User(userOneObj);
            const user = await save(userOne);

            expect(user).toBeDefined();
        });
        it('should save new product', async () => {
            await request(app);
            const productOne = new Product(productOneObj);
            const product = await save(productOne);

            expect(product).toBeDefined();
        });
        describe('given user and product is saved', () => {
            beforeAll(async () => {
                await save(new User(userOneObj));
                await save(new Product(productOneObj));
            });

            it('should return user from database', async () => {
                const user = await User.findOne(userOneObj);
                expect(user).toBeDefined();
                user && expect(user.name).toBe(userOneObj.name);
                user && expect(user.email).toBe(userOneObj.email);
            });
            it('should return product from database', async () => {
                const product = await Product.findOne(productOneObj);
                expect(product).toBeDefined();
                product && expect(product.name).toBe(productOneObj.name);
                product && expect(product.description).toBe(productOneObj.description);
            });
        });
    });
});
