import assert from "power-assert";
import { Result } from "../../src/result/Result";

describe("Result.constructor()", () => {
    it("success", async done => {
        const result = new Result<number>();

        result
            .onLoading(() => {
                assert.deepEqual(result.value.type, "Loading");
            })
            .onSuccess(v => {
                assert.deepEqual(1, v);
            })
            .onFailure(v => {
                assert.deepEqual("error", v);
            });

        result.success(1).onSuccess(v => {
            assert.deepEqual(1, v);
        });

        result
            .onLoading(() => {
                assert.deepEqual(result.value.type, "Loading");
            })
            .loading();

        result.failure("error").onFailure(v => {
            assert.deepEqual("error", v);
            done();
        });
    });
});
