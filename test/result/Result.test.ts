import assert from "power-assert";
import { ResultSuccess, ResultFailure } from "../../src/result/Result";

class TestingError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

describe("Result", () => {
    it("constructor - Success", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.isFailure, false);
        assert.deepEqual(result.isSuccess, true);
        assert.deepEqual(result.toString(), "Success(success)");
    });

    it("constructor - Failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.isFailure, true);
        assert.deepEqual(result.isSuccess, false);
        assert.deepEqual(result.toString(), "Failure(failure)");
    });

    it("getOrNull - Success", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.getOrNull(), "success");
    });

    it("getOrNull - Failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.getOrNull(), null);
    });

    it("getOrNull - null", async () => {
        const result = ResultSuccess();
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.isSuccess, true);
        assert.deepEqual(result.isFailure, false);
    });

    it("exceptionOrNull - Success", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("exceptionOrNull - Failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.exceptionOrNull(), { error: "failure" });
    });

    it("onSuccess, onFailure - Success", async () => {
        const result = ResultSuccess({})
            .onSuccess(res => {
                res.value.a = "newA";
            })
            .onFailure(res => {
                res.value.b = "newB";
            });
        assert.deepEqual(result.value, { a: "newA" });
    });

    it("onSuccess, onFailure - Failure", async () => {
        const result = ResultFailure("failure")
            .onSuccess(res => {
                res.value.a = "newA";
            })
            .onFailure(res => {
                res.value.b = "newB";
            });
        assert.deepEqual(result.value, { error: "failure", b: "newB" });
    });

    it("map - Success", async () => {
        const result = ResultSuccess("success").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), "map success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("map - Failure", async () => {
        const result = ResultFailure("failure").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.exceptionOrNull(), { error: "failure" });
    });

    it("mapCatching - Success", async () => {
        const result = ResultSuccess("success").mapCatching(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), "map success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("mapCatching - Failure", async () => {
        const result = ResultSuccess("success").mapCatching(value => {
            throw new TestingError(`error`);
        });
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.exceptionOrNull(), { error: "TestingError" });
    });
});
