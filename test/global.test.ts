import assert from "power-assert";
import "../src/global";
import { throwError } from "./tools";

describe("runCatching()", () => {
    it("success", async () => {
        const expected = `success`;
        const actual = await runCatching(() => `success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const expected = new Error(`arg=undefined is error`);

        try {
            await runCatching(throwError);
        } catch (error) {
            assert.equal(`${expected}`, `${error}`);
        }
    });
});

describe("repeat()", () => {
    it("success", async () => {
        const a: number[] = [];
        const expected = [1, 2, 3];
        repeat(3, count => {
            a.push(count);
        });
        assert.deepEqual(expected, a);
    });
});
