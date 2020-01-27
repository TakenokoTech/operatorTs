class Stack<E> {
    private q: E[] = [];

    push(v: E) {
        this.q.push(v);
    }

    pop(): E | null {
        if (this.q.length == 0) return null;
        const v = this.q[this.q.length - 1];
        this.q = this.q.slice(0, this.q.length - 1);
        return v;
    }

    clear() {
        this.q = [];
    }
}

export { Stack };
