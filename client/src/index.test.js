/**
 * @jest-environment jsdom
 */

describe('Math test', () => {
    test('it should find 2+4 equals 6', () => {
        const a = 2;
        const b = 3;

        expect(a*b).toBe(6);
    });
});
