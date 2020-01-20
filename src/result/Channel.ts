type Optional<T> = T | null;

// class Queue<E> {
//     resolve: (value?: any) => void;
//     q: Promise<any>;

//     constructor() {
//         this.resolve = () => {};
//         this.q = new Promise(resolve => {
//             this.resolve = resolve;
//         });
//     }

//     add(v: E) {
//         this.resolve(v);
//     }
// }

class Channel<E> {
    isFinished = false;
    resolve: ((value?: any) => void) | null = null;
    queue: Promise<any> | null = null;
    q: any[] = [];

    send(element: E) {
        if (this.isFinished) {
            this.q.push(element);
        } else {
            this.resolve && this.resolve(element);
            this.isFinished = true;
        }
    }

    async receive(): Promise<E> {
        this.queue = new Promise(resolve => (this.resolve = resolve));
        this.isFinished = false;

        if (this.q.length >= 1) {
            this.resolve && this.resolve(this.q[0]);
            this.q = this.q.slice(1);
            this.isFinished = true;
        }

        return this.queue;
    }

    cancel() {
        this.q = [];
    }
}

export { Channel };
