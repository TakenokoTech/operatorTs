import assert from "power-assert";
import { Stack } from "../../src/utils/Stack";

abstract class AbstractInterceptor<P, Q> {
    abstract intercept(param: P): Q;
}

class TerminalExpression_Number implements AbstractInterceptor<Stack<number>, void> {
    private number: number = 0;

    constructor(number: number) {
        this.number = number;
    }

    intercept(s: Stack<number | null>): void {
        s.push(this.number);
    }
}

class TerminalExpression_Plus implements AbstractInterceptor<Stack<number>, void> {
    intercept(s: Stack<number | null>): void {
        s.push(+(s.pop() ?? 0) + (s.pop() ?? 0));
    }
}

class TerminalExpression_Minus implements AbstractInterceptor<Stack<number>, void> {
    intercept(s: Stack<number | null>): void {
        s.push(-(s.pop() ?? 0) + (s.pop() ?? 0));
    }
}

class Parser {
    private parseTree: AbstractInterceptor<Stack<number>, void>[] = [];

    constructor(s: string) {
        for (const token of s.split(" ")) {
            if (token == "+") this.parseTree.push(new TerminalExpression_Plus());
            else if (token == "-") this.parseTree.push(new TerminalExpression_Minus());
            else this.parseTree.push(new TerminalExpression_Number(+token));
        }
    }

    evaluate(): number | null {
        const context: Stack<number> = new Stack();
        for (const e of this.parseTree) {
            e.intercept(context);
        }
        return context.pop();
    }
}

describe("Result.constructor()", () => {
    it("success", async () => {
        const expression = "42 4 2 - +";

        const p: Parser = new Parser(expression);
        const expected = 44;
        const actual = p.evaluate();

        assert.deepEqual(expected, actual);
    });
});
