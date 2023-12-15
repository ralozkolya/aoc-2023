import { getLine } from "../read-input.mjs";

const { line } = getLine("./input.txt");

const hash = (str) => {
  return str
    .split("")
    .reduce((sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256, 0);
};

const sum = line.split(",").reduce((sum, line) => {
  return (sum += hash(line));
}, 0);

console.log(sum);
