// Import the js file to test
import { handleSubmit } from "../js/formHandler.js"

describe("Testing: 'handleSubmit()'", () => {
    test('Should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });

    test('Should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});