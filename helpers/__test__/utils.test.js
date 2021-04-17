const {nameNormalizator} = require('../utils');

const nameNormData = [
    {input: 'Harry Potter', output: 'Harry Potter'},
    {input: 'Harry@Potter', output: 'Harry Potter'},
    {input: 'harry potter', output: 'Harry Potter'},
    {input: 'Harry-Potter', output: 'Harry Potter'},
    {input: 'HARRY POTTER', output: 'Harry Potter'},
    {input: 'HARRY                POTTER', output: 'Harry Potter'},
    {input: '', output: ''},
    {input: 'email@gmail.com', output: 'Email Gmail Com'}, // This function will not work correctly to email
    {input: undefined, output: ''},
    {input: '+380243412321', output: '380243412321'}, //Will not work for phones
]

describe('Test utils.js', () => {
    test('Should return normalized name', () => {
        nameNormData.forEach(testObj => {
            const name = nameNormalizator(testObj.input);

            expect(name).toBe(testObj.output)
        })
    });
});
