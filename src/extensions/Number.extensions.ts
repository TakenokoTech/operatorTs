export {};

declare global {
    interface Number {
        runCatching<T>(block: (arg: Number) => T): Promise<T>;
    }
}

Number.prototype.runCatching = async function<T>(block: (arg: Number) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};
