export {};

declare global {
    interface String {
        runCatching<T>(block: (arg: String) => T): Promise<T>;
    }
}

String.prototype.runCatching = function<T>(block: (arg: String) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};
