import assert from "power-assert";
import { ResultSuccess, ResultFailure } from "../../src/utils/Result";

class TestingError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

describe("Result.constructor()", () => {
    it("success", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.isFailure, false);
        assert.deepEqual(result.isSuccess, true);
        assert.deepEqual(result.toString(), "Success(success)");
    });

    it("failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.isFailure, true);
        assert.deepEqual(result.isSuccess, false);
        assert.deepEqual(result.toString(), "Failure(failure)");
    });
});

describe("Result.getOrNull()", () => {
    it("successs", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.getOrNull(), "success");
    });

    it("failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.getOrNull(), null);
    });

    it("null", async () => {
        const result = ResultSuccess();
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.isSuccess, true);
        assert.deepEqual(result.isFailure, false);
    });
});

describe("Result.exceptionOrNull()", () => {
    it("success", async () => {
        const result = ResultSuccess("success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const result = ResultFailure("failure");
        assert.deepEqual(result.exceptionOrNull(), "failure");
    });
});

describe("Result.onSuccess(), Result.onFailure()", () => {
    it("success", async () => {
        const result = ResultSuccess({})
            .onSuccess(res => {
                //res.value.a = "newA";
            })
            .onFailure(res => {
                //res.value.b = "newB";
            });
        assert.deepEqual(result.value, { type: "Success", message: {} });
    });

    it("failure", async () => {
        const result = ResultFailure("failure")
            .onSuccess(res => {
                //res.value.a = "newA";
            })
            .onFailure(res => {
                //res.value.b = "newB";
            });
        assert.deepEqual(result.value, { type: "Failure", error: "failure" });
    });
});

describe("Result.map()", () => {
    it("success", async () => {
        const result = ResultSuccess("success").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), "map success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const result = ResultFailure("failure").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.exceptionOrNull(), "failure");
    });
});

describe("Result.mapCatching()", () => {
    it("success", async () => {
        const result = ResultSuccess("success").mapCatching(value => {
            return `map ${value}`;
        });
        assert.deepEqual(result.getOrNull(), "map success");
        assert.deepEqual(result.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const result = ResultSuccess("success").mapCatching(value => {
            throw new TestingError(`error`);
        });
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.exceptionOrNull(), "TestingError");
    });

    it("before failure", async () => {
        const result = ResultFailure("failure").mapCatching(value => {
            throw new TestingError(`error`);
        });
        assert.deepEqual(result.getOrNull(), null);
        assert.deepEqual(result.exceptionOrNull(), "failure");
    });
});
