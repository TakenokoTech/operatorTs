import assert from "power-assert";
import "../../src/extensions/runCatching";

const assertError = async (block: Promise<any>) => {
    try {
        const a = await block;
        return null;
    } catch (error) {
        return error;
    }
};

describe("Extensions", async () => {
    describe("runCatching()", async () => {
        it("success: String", async () => {
            const a: String = "test";
            const expected = `arg=test is success`;
            const actual = await a.runCatching(arg => `arg=${arg} is success`);
            assert.equal(expected, actual);
            // console.log(`${expected}`, `${actual}`);
        });

        it("error: String", async () => {
            const a: String = "test";
            const expected = new Error(`arg=test is error`);
            const actual = await assertError(
                a.runCatching(arg => {
                    throw new Error(`arg=${arg} is error`);
                }),
            );
            assert.equal(`${expected}`, `${actual}`);
            // console.log(`${expected}`, `${actual}`);
        });

        it("success: Number", async () => {
            const a: Number = 111;
            const expected = `arg=111 is success`;
            const actual = await a.runCatching(arg => `arg=${arg} is success`);
            assert.equal(expected, actual);
            // console.log(`${expected}`, `${actual}`);
        });

        it("error: Number", async () => {
            const a: Number = 111;
            const expected = new Error(`arg=111 is error`);
            const actual = await assertError(
                a.runCatching(arg => {
                    throw new Error(`arg=${arg} is error`);
                }),
            );
            assert.equal(`${expected}`, `${actual}`);
            // console.log(`${expected}`, `${actual}`);
        });

        it("success: Promise", async () => {
            const a: Promise<String> = Promise.resolve("test");
            const expected = `arg=test is success`;
            const actual = await a.runCatching(arg => `arg=${arg} is success`);
            assert.equal(expected, actual);
            // console.log(`${expected}`, `${actual}`);
        });

        it("error: Promise", async () => {
            const a: Promise<String> = Promise.resolve("test");
            const expected = new Error(`arg=test is error`);
            const actual = await assertError(
                a.runCatching(arg => {
                    throw new Error(`arg=${arg} is error`);
                }),
            );
            assert.equal(`${expected}`, `${actual}`);
            // console.log(`${expected}`, `${actual}`);
        });
    });
});
