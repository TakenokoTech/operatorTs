import assert from "power-assert";
import { Channel } from "../../src/result/Channel";

describe("Channel.receive()", () => {
    it("success", async done => {
        const channel = new Channel<number>();

        Promise.resolve().then(() => {
            for (const x of [5, 4, 3, 2, 1]) channel.send(x);
        });

        assert.deepEqual(5, await channel.receive());
        assert.deepEqual(4, await channel.receive());
        assert.deepEqual(3, await channel.receive());
        assert.deepEqual(2, await channel.receive());

        done();
    });
});

describe("Channel.cancel()", () => {
    it("success", async done => {
        const channel = new Channel<number>();

        Promise.resolve().then(() => {
            for (const x of [3, 2, 1]) channel.send(x);
        });

        assert.deepEqual(3, await channel.receive());
        assert.deepEqual(2, await channel.receive());

        channel.cancel();

        Promise.resolve().then(() => {
            for (const x of [3, 2, 1]) channel.send(x);
        });

        assert.deepEqual(3, await channel.receive());
        assert.deepEqual(2, await channel.receive());

        done();
    });
});
