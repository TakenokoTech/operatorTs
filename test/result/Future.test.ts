import assert from "power-assert";
import { FutureSuccess, FutureFailure } from "../../src/result/Future";

class TestingError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

describe("Future.constructor()", () => {
    it("success", async () => {
        const future = FutureSuccess("success");
        assert.deepEqual(future.isFailure, false);
        assert.deepEqual(future.isSuccess, true);
        assert.deepEqual(future.toString(), "Success(success)");
    });

    it("failure", async () => {
        const future = FutureFailure("failure");
        assert.deepEqual(future.isFailure, true);
        assert.deepEqual(future.isSuccess, false);
        assert.deepEqual(future.toString(), "Failure(failure)");
    });
});

describe("Future.getOrNull()", () => {
    it("successs", async () => {
        const future = FutureSuccess("success");
        assert.deepEqual(future.getOrNull(), "success");
    });

    it("failure", async () => {
        const future = FutureFailure("failure");
        assert.deepEqual(future.getOrNull(), null);
    });

    it("null", async () => {
        const future = FutureSuccess();
        assert.deepEqual(future.getOrNull(), null);
        assert.deepEqual(future.isSuccess, true);
        assert.deepEqual(future.isFailure, false);
    });
});

describe("Future.exceptionOrNull()", () => {
    it("success", async () => {
        const future = FutureSuccess("success");
        assert.deepEqual(future.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const future = FutureFailure("failure");
        assert.deepEqual(future.exceptionOrNull(), { error: "failure" });
    });
});

describe("Future.onSuccess(), Future.onFailure()", () => {
    it("success", async () => {
        const future = FutureSuccess({})
            .onSuccess(res => {
                res.value.a = "newA";
            })
            .onFailure(res => {
                res.value.b = "newB";
            });
        assert.deepEqual(future.value, { a: "newA" });
    });

    it("failure", async () => {
        const future = FutureFailure("failure")
            .onSuccess(res => {
                res.value.a = "newA";
            })
            .onFailure(res => {
                res.value.b = "newB";
            });
        assert.deepEqual(future.value, { error: "failure", b: "newB" });
    });
});

describe("Future.map()", () => {
    it("success", async () => {
        const future = FutureSuccess("success").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(future.getOrNull(), "map success");
        assert.deepEqual(future.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const future = FutureFailure("failure").map(value => {
            return `map ${value}`;
        });
        assert.deepEqual(future.getOrNull(), null);
        assert.deepEqual(future.exceptionOrNull(), { error: "failure" });
    });
});

describe("Future.mapCatching()", () => {
    it("success", async () => {
        const future = FutureSuccess("success").mapCatching(value => {
            return `map ${value}`;
        });
        assert.deepEqual(future.getOrNull(), "map success");
        assert.deepEqual(future.exceptionOrNull(), null);
    });

    it("failure", async () => {
        const future = FutureSuccess("success").mapCatching(value => {
            throw new TestingError(`error`);
        });
        assert.deepEqual(future.getOrNull(), null);
        assert.deepEqual(future.exceptionOrNull(), { error: "TestingError" });
    });
});
