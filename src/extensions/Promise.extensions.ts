export {};

declare global {
    interface Promise<T> {
        runCatching<T, U>(block: (arg: Promise<T>) => U): Promise<U>;
    }
}

Promise.prototype.runCatching = async function<T, U>(block: (arg: T) => U): Promise<U> {
    return this.then(block);
};
