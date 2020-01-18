import assert from "power-assert";
import "../../src/extensions/Array.extensions";

describe("Extensions Array", () => {
    it("success: any", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = true;
        const actual = a.any(it => it == "c");
        assert.deepEqual(expected, actual);
    });

    it("failed: any", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = false;
        const actual = a.any(it => it == "d");
        assert.deepEqual(expected, actual);
    });
});

describe("Extensions Array", () => {
    it("success: all", async () => {
        const b: Array<Number> = [10, 11, 12];
        const expected = true;
        const actual = b.all((it: Number) => it >= 10);
        assert.deepEqual(expected, actual);
    });

    it("failed: all", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = false;
        const actual = a.all(it => it == "a");
        assert.deepEqual(expected, actual);
    });
});

describe("Extensions Array", () => {
    it("success: groupBy", async () => {
        const b: { a: number; b: number }[] = [
            { a: 1, b: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 3 },
            { a: 2, b: 4 },
        ];
        const expected = {
            1: [
                { a: 1, b: 1 },
                { a: 1, b: 2 },
            ],
            2: [
                { a: 2, b: 3 },
                { a: 2, b: 4 },
            ],
        };
        const actual = b.groupBy((it: { a: number; b: number }) => it.a);
        assert.deepEqual(expected, actual);
    });
});
