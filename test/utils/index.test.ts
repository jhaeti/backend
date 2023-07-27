import * as utils from '../../src/utils';

describe('cookie utility functions', () => {
    it('should be defined', () => {
        expect(utils.cookie).toBeDefined();
    });
    it('should have a setAuthCookie method', () => {
        expect(utils.cookie.setAuthCookie).toBeDefined();
    });
    it('should have a clearAuthCookie method', () => {
        expect(utils.cookie.clearAuthCookie).toBeDefined();
    });
    it('should have a getAuthCookie method', () => {
        expect(utils.cookie.getAuthToken).toBeDefined();
    });
});

describe('connectDb utility function', () => {
    it('should be defined', () => {
        expect(utils.connectDb).toBeDefined();
    });
});

describe('connectTestDb utility function', () => {
    it('should be defined', () => {
        expect(utils.connectTestDb).toBeDefined();
    });
});
describe('defaultAdmin utility function', () => {
    it('should be defined', () => {
        expect(utils.defaultAdmin).toBeDefined();
    });
});
describe('save utility function', () => {
    it('should be defined', () => {
        expect(utils.save).toBeDefined();
    });
});
