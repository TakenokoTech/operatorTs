import assert from "power-assert";
import "../../src/extensions/Object.extensions";

describe("Extensions Object", () => {
    it("success: run", async () => {
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

    it("success: apply", async () => {
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

    it("success: also", async () => {
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

    it("success: let", async () => {
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

    it("success: takeIf", async () => {
        const a: any = { a: `value a` };
        const expected1 = { a: `value a` };
        const actual1 = a.takeIf((it: any) => it.a == `value a`);
        assert.deepEqual(expected1, actual1);

        const expected2 = null;
        const actual2 = a.takeIf((it: any) => it.b == `value b`);
        assert.deepEqual(expected2, actual2);
    });

    it("success: repeat", async () => {
        const a: number[] = [];
        const expected = [1, 2, 3];
        repeat(3, count => {
            a.push(count);
        });
        assert.deepEqual(expected, a);
    });
});
