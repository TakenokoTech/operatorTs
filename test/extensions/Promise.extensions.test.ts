import assert from "power-assert";
import { throwError } from "../utils";
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

        try {
            await a.runCatching(throwError);
        } catch (error) {
            assert.equal(`${expected}`, `${error}`);
        }
    });
});
