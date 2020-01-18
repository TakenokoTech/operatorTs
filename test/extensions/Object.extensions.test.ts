import assert from "power-assert";
import "../../src/extensions/Object.extensions";

describe("Extensions Object", () => {
    it("success: apply", async () => {
        const a: any = {
            a: `value a`,
        };
        const expected = {
            a: `value a`,
            x: `value x`,
            y: `value y`,
        };
        const actual = a.apply((arg: any) => {
            arg.x = `value x`;
            arg.y = `value y`;
        });
        assert.deepEqual(expected, actual);
    });
});
