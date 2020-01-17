export {};

declare global {
    interface String {
        runCatching<T>(block: (arg: String) => T): Promise<T>;
    }
    interface Number {
        runCatching<T>(block: (arg: Number) => T): Promise<T>;
    }
    interface Promise<T> {
        runCatching<T, U>(block: (arg: Promise<T>) => U): Promise<U>;
    }
}

String.prototype.runCatching = function<T>(block: (arg: String) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};

Number.prototype.runCatching = function<T>(block: (arg: Number) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};

Promise.prototype.runCatching = function<T, U>(block: (arg: T) => U): Promise<U> {
    return this.then(block);
};
