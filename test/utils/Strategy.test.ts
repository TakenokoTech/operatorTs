import assert from "power-assert";
import { Strategy, Context } from "../../src/utils/Strategy";

class A implements Strategy<string, string> {
    execute(param: string): string {
        return param + "class A";
    }
}

class B implements Strategy<string, string> {
    execute(param: string): string {
        return param + " + class B";
    }
}

describe("Result.constructor()", () => {
    it("success", async () => {
        let context: Context<string, string> | null = null;

        context = new Context(A);
        const a = context.execute("");
        assert.deepEqual(a, "class A");

        context = new Context(B);
        const b = context.execute(a);
        assert.deepEqual(b, "class A + class B");
    });
});
