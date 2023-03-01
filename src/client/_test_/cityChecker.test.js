// Import the js file to test
import { checkForCity, autoComplete, checkDate } from "../js/cityChecker.js"

describe("Testing: 'checkForCity(), autoComplete() and checkDate()'", () => {
    test('Should be defined', () => {
        expect(checkForCity).toBeDefined();
    });

    test('Should be defined', () => {
        expect(autoComplete).toBeDefined();
    });

    test('Should be defined', () => {
        expect(checkDate).toBeDefined();
    })
});

