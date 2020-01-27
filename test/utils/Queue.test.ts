import assert from "power-assert";
import { Queue } from "../../src/utils/Queue";

describe("Queue", () => {
    it("success", async () => {
        const queue: Queue<number> = new Queue();

        queue.enqueue(1);
        queue.enqueue(2);

        const actual1 = queue.dequeue();
        const expected1 = 1;
        assert.deepEqual(expected1, actual1);

        const actual2 = queue.dequeue();
        const expected2 = 2;
        assert.deepEqual(expected2, actual2);
    });
});
