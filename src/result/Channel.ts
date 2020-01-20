import { Queue } from "./Queue";

class ChannelPromise<E> {
    public isFinished = false;
    public promise: Promise<any> | null = null;
    private resolver: ((value: E) => void) | null = null;

    init() {
        this.promise = new Promise(resolve => (this.resolver = resolve));
        this.isFinished = false;
    }

    resolve(v: E) {
        this.resolver && this.resolver(v);
        this.isFinished = true;
    }
}

class Channel<E> {
    private cPromise: ChannelPromise<E> = new ChannelPromise<E>();
    private queue: Queue<E> = new Queue<E>();

    send(v: E) {
        if (this.cPromise.isFinished) this.queue.push(v);
        else this.cPromise.resolve(v);
    }

    async receive(): Promise<E> {
        this.cPromise.init();
        const p = this.queue.pop();
        if (p != null) this.cPromise.resolve(p);
        return this.cPromise.promise;
    }

    cancel() {
        this.queue.clear();
    }
}

export { Channel };
