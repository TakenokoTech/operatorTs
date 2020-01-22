import assert from "power-assert";
import { throwError } from "../utils";
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

        try {
            await a.runCatching(throwError);
        } catch (error) {
            assert.equal(`${expected}`, `${error}`);
        }
    });
});
