import assert from "power-assert";
import { Future } from "../../src/result/Future";

describe("Future.constructor()", () => {
    it("success", async done => {
        const future = new Future<number>();

        future
            .onLoading(() => {
                assert.deepEqual(future.value.type, "Loading");
            })
            .onSuccess(v => {
                assert.deepEqual(1, v);
            })
            .onFailure(v => {
                assert.deepEqual("error", v);
            });

        future.success(1).onSuccess(v => {
            assert.deepEqual(1, v);
        });

        future
            .onLoading(() => {
                assert.deepEqual(future.value.type, "Loading");
            })
            .loading();

        future.failure("error").onFailure(v => {
            assert.deepEqual("error", v);
            done();
        });
    });
});
