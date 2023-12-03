import { getLines } from "../read-input.mjs";

const result = getLines("./input.txt")
  .map((line) => {
    const numbers = line.match(/\d/g).join("");
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    return Number(first + last);
  })
  .reduce((a, b) => a + b);

console.log(result);
