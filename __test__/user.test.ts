import supertest from 'supertest';
import app from '../src/app';

describe('User', () => {
    describe('get users', () => {
        it('should return a list of users', async () => {
            const res = await supertest(app).get('/users');
            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });
    });
});
