import assert from "power-assert";
import { assertError } from "../utils";
import "../../src/extensions/Boolean.extensions";

describe("Boolean.runCatching()", () => {
    it("success", async () => {
        const a: Boolean = true;
        const expected = `arg=true is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const a: Boolean = true;
        const expected = new Error(`arg=true is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
