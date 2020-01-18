export {};

declare global {
    interface Array<T> {
        any<T>(block: (it: T) => Boolean): Boolean;
        all<T>(block: (it: T) => Boolean): Boolean;
    }
}

Array.prototype.any = function<T>(block: (it: T) => Boolean): Boolean {
    for (const a of this) {
        if (block(a)) return true;
    }
    return false;
};

Array.prototype.all = function<T>(block: (it: T) => Boolean): Boolean {
    for (const a of this) {
        if (!block(a)) return false;
    }
    return true;
};
