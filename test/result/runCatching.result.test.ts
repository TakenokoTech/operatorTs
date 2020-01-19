import assert from "power-assert";
import "../../src/result/runCatching.result";

const assertError = async (block: Promise<any>) => {
    try {
        const a = await block;
        return null;
    } catch (error) {
        return error;
    }
};

describe("Extensions runCatching()", () => {
    it("success: Boolean", async () => {
        const a: Boolean = true;
        const expected = `arg=true is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failed: Boolean", async () => {
        const a: Boolean = true;
        const expected = new Error(`arg=true is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
    it("success: String", async () => {
        const a: String = "test";
        const expected = `arg=test is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failed: String", async () => {
        const a: String = "test";
        const expected = new Error(`arg=test is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });

    it("success: Number", async () => {
        const a: Number = 111;
        const expected = `arg=111 is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failed: Number", async () => {
        const a: Number = 111;
        const expected = new Error(`arg=111 is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });

    it("success: Array", async () => {
        const a: number[] = [1];
        const expected = `arg=[1] is success`;
        const actual = await a.runCatching(arg => `arg=${JSON.stringify(arg)} is success`);
        assert.equal(expected, actual);
    });

    it("failed: Array", async () => {
        const a: number[] = [1];
        const expected = new Error(`arg=[1] is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${JSON.stringify(arg)} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });

    it("success: Object", async () => {
        const a: any = {};
        const expected = `arg={} is success`;
        const actual = await a.runCatching((arg: {}) => `arg=${JSON.stringify(arg)} is success`);
        assert.equal(expected, actual);
    });

    it("failed: Object", async () => {
        const a: any = {};
        const expected = new Error(`arg={} is error`);
        const actual = await assertError(
            a.runCatching((arg: {}) => {
                throw new Error(`arg=${JSON.stringify(arg)} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });

    it("success: Promise", async () => {
        const a: Promise<String> = Promise.resolve("test");
        const expected = `arg=test is success`;
        const actual = await a.runCatching(arg => `arg=${arg} is success`);
        assert.equal(expected, actual);
    });

    it("failed: Promise", async () => {
        const a: Promise<String> = Promise.resolve("test");
        const expected = new Error(`arg=test is error`);
        const actual = await assertError(
            a.runCatching(arg => {
                throw new Error(`arg=${arg} is error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });

    it("success: Global", async () => {
        const expected = `success`;
        const actual = await runCatching(() => `success`);
        assert.equal(expected, actual);
    });

    it("failed: Global", async () => {
        const expected = new Error(`error`);
        const actual = await assertError(
            runCatching(() => {
                throw new Error(`error`);
            }),
        );
        assert.equal(`${expected}`, `${actual}`);
    });
});
