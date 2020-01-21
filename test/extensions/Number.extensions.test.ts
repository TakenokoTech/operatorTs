import assert from "power-assert";
import { assertError } from "../utils";
import "../../src/extensions/Number.extensions";

describe("Number.runCatching()", () => {
    it("success", async () => {
        const a: Number = 111;
        const expected = `arg=111 is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const a: Number = 111;
        const expected = new Error(`arg=111 is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
