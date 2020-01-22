import assert from "power-assert";
import "../src/global";
import { throwError } from "./utils";

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
