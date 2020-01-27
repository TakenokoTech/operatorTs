import assert from "power-assert";
import { Stack } from "../../src/utils/Stack";

describe("Queue", () => {
    it("success", async () => {
        const queue: Stack<number> = new Stack();

        queue.push(1);
        queue.push(2);

        const actual1 = queue.pop();
        const expected1 = 2;
        assert.deepEqual(expected1, actual1);

        const actual2 = queue.pop();
        const expected2 = 1;
        assert.deepEqual(expected2, actual2);

        queue.push(3);
        queue.push(4);
        queue.clear();
        queue.push(5);
        const actual3 = queue.pop();
        const expected3 = 5;
        assert.deepEqual(expected3, actual3);

        const actual4 = queue.pop();
        const expected4 = null;
        assert.deepEqual(expected4, actual4);
    });
});
