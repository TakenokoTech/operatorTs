import assert from "power-assert";
import "../../src/extensions/Object.extensions";
import { assertError } from "../utils";

describe("Object.run()", () => {
    it("success", async () => {
        const a: any = {
            a: `value a`,
        };
        const expected = {
            x: `value x + value a`,
            y: `value y`,
        };
        const actual = a.run(() => ({
            x: `value x + ${a.a}`,
            y: `value y`,
        }));
        assert.deepEqual(expected, actual);
        assert.deepEqual(a, { a: `value a` });
    });
});

describe("Object.apply()", () => {
    it("success", async () => {
        const a: any = {
            a: `value a`,
        };
        const expected = {
            a: `value a`,
            x: `value x`,
            y: `value y`,
            z: `value z`,
        };
        const actual = a
            .apply(() => {
                a.x = `value x`;
                a.y = `value y`;
            })
            .apply(() => {
                a.z = `value z`;
            });
        assert.deepEqual(expected, actual);
    });
});

describe("Object.also()", () => {
    it("success", async () => {
        const a: any = {
            a: `value a`,
        };
        const expected = {
            a: `value a`,
            x: `value x`,
            y: `value y`,
            z: `value z`,
        };
        const actual = a
            .also((self: any) => {
                self.x = `value x`;
                self.y = `value y`;
            })
            .also((self: any) => {
                self.z = `value z`;
            });
        assert.deepEqual(expected, actual);
    });
});

describe("Object.let()", () => {
    it("success", async () => {
        const a: any = {
            a: `value a`,
        };
        const expected = {
            x: `value x + value a`,
            y: `value y + value z`,
        };
        const actual = a
            .let((it: any) => ({
                x: `value x + ${it.a}`,
                y: `value y`,
            }))
            .let((it: any) => ({
                x: `${it.x}`,
                y: `${it.y} + value z`,
            }));
        assert.deepEqual(expected, actual);
    });
});

describe("Object.takeIf()", () => {
    it("success", async () => {
        const a: any = { a: `value a` };
        const expected1 = { a: `value a` };
        const actual1 = a.takeIf((it: any) => it.a == `value a`);
        assert.deepEqual(expected1, actual1);

        const expected2 = null;
        const actual2 = a.takeIf((it: any) => it.b == `value b`);
        assert.deepEqual(expected2, actual2);
    });
});

describe("Object.repeat()", () => {
    it("success", async () => {
        const a: number[] = [];
        const expected = [1, 2, 3];
        repeat(3, count => {
            a.push(count);
        });
        assert.deepEqual(expected, a);
    });
});

describe("Object.runCatching()", () => {
    it("success", async () => {
        const a: any = {};
        const expected = `arg={} is success`;
        const actual = await a.runCatching((arg: {}) => `arg=${JSON.stringify(arg)} is success`);
        assert.equal(expected, actual);
    });

    it("failure", async () => {
        const a: any = {};
        const expected = new Error(`arg={} is error`);
        const actual = await assertError(
            a.runCatching((arg: {}) => {
                throw new Error(`arg=${JSON.stringify(arg)} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
