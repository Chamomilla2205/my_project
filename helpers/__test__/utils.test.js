const {nameNormalizator} = require('../utils');

describe('Test utils.js', () => {
    test('Should return normalized name', () => {
        const name = nameNormalizator('john   doe');

        expect(name).toBe('John Doe')
    });
});
