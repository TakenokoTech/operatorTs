export {};

declare global {
    interface Object {
        run<T>(block: () => T): T;
        apply(block: () => void): Object;
        also(block: (self: Object) => void): Object;
        let<T>(block: (self: Object) => T): T;
        takeIf(block: (self: Object) => Boolean): Object | null;
        repeat(times: number, block: (count: number, self: Object) => void): void;
        runCatching<T>(block: (self: Object) => T): Promise<T>;
    }
}

Object.prototype.run = function<T>(block: () => T): T {
    return block();
};

Object.prototype.apply = function(block: () => void): Object {
    block();
    return this;
};

Object.prototype.also = function(block: (self: Object) => void): Object {
    block(this);
    return this;
};

Object.prototype.let = function<T>(block: (self: Object) => T): T {
    return block(this);
};

Object.prototype.takeIf = function(block: (self: Object) => Boolean): Object | null {
    return block(this) ? this : null;
};

Object.prototype.repeat = function(times: number, block: (count: number, self: Object) => void): void {
    for (let index = 1; index <= times; index++) block(index, this);
};

Object.prototype.runCatching = async function<T>(block: (self: Object) => T): Promise<T> {
    try {
        return Promise.resolve(block(this));
    } catch (error) {
        return Promise.reject(error);
    }
};
