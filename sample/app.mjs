import "@takenokotech/operatorts";
// import TestTarget from "@takenokotech/operatorts/dist/main.js";
// console.log(new TestTarget.default());

const arr = [11, 12, 13, 14];
console.log(
    `arr.any(it => it > 15)`,
    arr.any(it => it > 15),
);
console.log(
    `arr.any(it => it > 10)`,
    arr.any(it => it > 10),
);
