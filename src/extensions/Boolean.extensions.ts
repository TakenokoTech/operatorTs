export {};

declare global {
    interface Boolean {
        runCatching<T>(block: (arg: Boolean) => T): Promise<T>;
    }
}

Boolean.prototype.runCatching = async function<T>(block: (arg: Boolean) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};
