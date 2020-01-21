export {};

import "./Object.extensions";

declare global {
    function repeat(times: number, block: (count: number) => void): void;
    function runCatching<T>(block: (arg: Object) => T): Promise<T>;
}
