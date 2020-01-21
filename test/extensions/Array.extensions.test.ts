import assert from "power-assert";
import { assertError } from "../utils";
import "../../src/extensions/Array.extensions";

describe("Array.any()", () => {
    it("success", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = true;
        const actual = a.any(it => it == "c");
        assert.deepEqual(expected, actual);
    });

    it("failure", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = false;
        const actual = a.any(it => it == "d");
        assert.deepEqual(expected, actual);
    });
});

describe("Array.all()", () => {
    it("success", async () => {
        const b: Array<Number> = [10, 11, 12];
        const expected = true;
        const actual = b.all((it: Number) => it >= 10);
        assert.deepEqual(expected, actual);
    });

    it("failure", async () => {
        const a: Array<String> = ["a", "b", "c"];
        const expected = false;
        const actual = a.all(it => it == "a");
        assert.deepEqual(expected, actual);
    });
});

describe("Array.groupBy()", () => {
    it("success", async () => {
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

describe("Array.runCatching()", () => {
    it("success", async () => {
        const a: number[] = [1];
        const expected = `arg=[1] is success`;
        const actual = await a.runCatching(arg => `arg=${JSON.stringify(arg)} is success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const a: number[] = [1];
        const expected = new Error(`arg=[1] is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${JSON.stringify(arg)} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
