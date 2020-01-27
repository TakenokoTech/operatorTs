class Queue<E> {
    private q: E[] = [];

    enqueue(v: E) {
        this.q.push(v);
    }

    dequeue(): E | null {
        if (this.q.length == 0) return null;
        const v = this.q[0];
        this.q = this.q.slice(1);
        return v;
    }

    clear() {
        this.q = [];
    }
}

export { Queue };
