import supertest from 'supertest';

import app from '../src/app';

describe('app', () => {
    describe('given the route is /', () => {
        it('should be running.', async () => {
            const { body } = await supertest(app).get('/').expect(200);
            expect(body.message).toBe('Server is up and running...');
        });
    });

    describe('route does not exist', () => {
        it('Should return 404', async () => {
            const unExistingRoute = '/sdfjldaskf';
            const { statusCode } = await supertest(app).get(unExistingRoute);

            expect(statusCode).toBe(404);
        });
        it('Should return object with a errorType property of value not_found', async () => {
            const unExistingRoute = '/sdfjldaskf';
            const { body } = await supertest(app).get(unExistingRoute).expect(404);

            expect(body.errorType).toBe('not_found');
        });
        it('Should return errors array with first ele of message The request cannot be handled', async () => {
            const unExistingRoute = '/sdfjldaskf';
            const { body } = await supertest(app).get(unExistingRoute).expect(404);

            expect(body.errors[0].message).toBe('The request could not be handled.');
        });
    });
});
