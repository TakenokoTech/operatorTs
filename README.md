# operatorTs

[![Node+CI](https://github.com/TakenokoTech/operatorTs/workflows/Node%20CI/badge.svg)](https://github.com/TakenokoTech/operatorTs/actions?query=workflow%3A%22Node+CI%22)
[![codecov](https://codecov.io/gh/TakenokoTech/operatorTs/branch/master/graph/badge.svg)](https://codecov.io/gh/TakenokoTech/operatorTs)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nokotech/actions/blob/master/LICENSE)

## Installation

```
$ echo "@takenokotech:registry=https://npm.pkg.github.com/" > .npmrc
$ npm install @takenokotech/operatorts
```

## Usage

Extension Array --
[Array.extensions.ts](https://github.com/TakenokoTech/operatorTs/blob/master/src/extensions/Array.extensions.ts)

```
// Returns `true` if at least one element matches the given [block].
Array<T>.any(block: (it: T) => Boolean): Boolean;

// Returns `true` if all elements match the given [block].
Array<T>.all(block: (it: T) => Boolean): Boolean;

// Groups elements of the original collection by the key returned by the given [block]
Array<T>.groupBy<K>(block: (it: T) => string | number): { [key: string]: Array<T> };
```

Extension Object --
[Object.extensions.ts](https://github.com/TakenokoTech/operatorTs/blob/master/src/extensions/Object.extensions.ts)

```
// Calls the specified function [block] and returns its result.
Object.run<T>(block: () => T): T;

// Calls the specified function [block] with `this` value as its argument and returns `this` value.
Object.apply(block: () => void): Object;

// Calls the specified function [block] with `this` value as its receiver and returns `this` value.
Object.also(block: (self: Object) => void): Object;

// Calls the specified function [block] with `this` value as its argument and returns its result.
Object.let<T>(block: (self: Object) => T): T;

// Returns `this` value if it satisfies the given [block] or `null`, if it doesn't.
Object.takeIf(block: (self: Object) => Boolean): Object | null;

// Executes the given function [block] specified number of [times].
Object.repeat(times: number, block: (count: number) => void): void;

// Calls the specified function [block] with `this` value as its receiver and returns its encapsulated result.
Object.runCatching<T>(block: (arg: Object) => T): Promise<T>;
```
