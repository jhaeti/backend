import supertest from 'supertest';
import mongoose from 'mongoose';

import { RegisterSchema, LoginSchema } from '../../src/schemas/user.schemas';
import app from '../../src/app';
import User from '../../src/models/User';
import * as userServices from '../../src/services/user.services';
import connectTestDb from '../../src/utils/connectTestDb';

const userOneObj = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john12345',
};

const { name, email, password } = userOneObj;

describe('UserSchema', () => {
    describe('Register Schema', () => {
        describe('Given object is empty', () => {
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({})).toThrow();
            });
        });
        describe('Given name is not present in object', () => {
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ email })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ password })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ password, email })).toThrow();
            });
        });
        describe('Given password is not present in object ', () => {
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ name })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ email })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ name, email })).toThrow();
            });
        });
        describe('Given email is not present in object ', () => {
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ name })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ password })).toThrow();
            });
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ name, password })).toThrow();
            });
        });
    });
    describe('Login Schema', () => {
        describe('Given object is empty', () => {
            it('should throw error', async () => {
                expect(() => LoginSchema.parse({})).toThrow();
            });
        });

        describe('Given password is not present in object ', () => {
            it('should throw error', async () => {
                expect(() => LoginSchema.parse({ email })).toThrow();
            });
        });
        describe('Given email is not present in object ', () => {
            it('should throw error', async () => {
                expect(() => RegisterSchema.parse({ password })).toThrow();
            });
        });
        describe('Given object is valid', () => {
            it('should return an object', () => {
                const res = LoginSchema.parse({ email, password });
                expect(res).toEqual({ email, password });
            });
        });
    });
});
