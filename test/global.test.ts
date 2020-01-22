import assert from "power-assert";
import { assertError } from "./utils";
import "../src/global";

describe("runCatching()", () => {
    it("success", async () => {
        const expected = `success`;
        const actual = await runCatching(() => `success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const expected = new Error(`error`);

        try {
            await runCatching(() => {
                throw new Error(`error`);
            });
        } catch (error) {
            assert.equal(`${expected}`, `${error}`);
        }
    });
});
