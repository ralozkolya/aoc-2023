import { getLines } from "../read-input.mjs";

const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const reverse = (str) => str.split("").reverse().join("");
const match = (match) =>
  !isNaN(+match) ? match : map[match] ?? map[reverse(match)];

const pattern = Object.keys(map).join("|");
const regex = new RegExp(`\\d|${pattern}`);
const revRegex = new RegExp(`\\d|${reverse(pattern)}`);

const result = getLines("./input.txt")
  .map((line) => {
    line = line.replace(regex, match);
    line = reverse(reverse(line).replace(revRegex, match));

    const numbers = line.match(/\d/g).join("");

    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    return Number(first + last);
  })
  .reduce((a, b) => a + b);

console.log(result);
