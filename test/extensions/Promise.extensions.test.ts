import assert from "power-assert";
import { assertError } from "../utils";
import "../../src/extensions/Promise.extensions";

describe("Promise.runCatching()", () => {
    it("success", async () => {
        const a: Promise<String> = Promise.resolve("test");
        const expected = `arg=test is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const a: Promise<String> = Promise.resolve("test");
        const expected = new Error(`arg=test is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
