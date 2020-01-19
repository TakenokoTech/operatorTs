export {};

declare global {
    interface Boolean {
        runCatching<T>(block: (arg: Boolean) => T): Promise<T>;
    }

    interface String {
        runCatching<T>(block: (arg: String) => T): Promise<T>;
    }

    interface Number {
        runCatching<T>(block: (arg: Number) => T): Promise<T>;
    }

    interface Array<T> {
        runCatching<T, U>(block: (arg: Array<T>) => U): Promise<U>;
    }

    interface Object {
        runCatching<T>(block: (arg: Object) => T): Promise<T>;
    }

    interface Promise<T> {
        runCatching<T, U>(block: (arg: Promise<T>) => U): Promise<U>;
    }

    function runCatching<T>(block: () => T): Promise<T>;
}

Boolean.prototype.runCatching = function<T>(block: (arg: Boolean) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};

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

Array.prototype.runCatching = function<T, U>(block: (arg: Array<T>) => U): Promise<U> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};

Object.prototype.runCatching = function<T>(block: (arg: Object) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};

Promise.prototype.runCatching = function<T, U>(block: (arg: T) => U): Promise<U> {
    return this.then(block);
};
