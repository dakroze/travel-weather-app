// Import the js file to test
import {postData} from "../js/postData"

describe("Testing: 'postData()'", () => {
    test('Should be defined', () => {
        expect(postData).toBeDefined();
    });
});