import assert from "power-assert";
import { assertError } from "../utils";
import "../../src/extensions/global";

describe("runCatching()", () => {
    it("success", async () => {
        const expected = `success`;
        const actual = await runCatching(() => `success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const expected = new Error(`error`);
        const actual = await assertError(
            runCatching(() => {
                throw new Error(`error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
