import assert from "power-assert";
import { throwError } from "../utils";
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

        try {
            await a.runCatching(throwError);
        } catch (error) {
            assert.equal(`${expected}`, `${error}`);
        }
    });
});
