export {};

declare global {
    interface Object {
        apply(block: (arg: Object) => void): Object;
    }
}

Object.prototype.apply = function(block: (arg: Object) => void): Object {
    block(this);
    return this;
};
