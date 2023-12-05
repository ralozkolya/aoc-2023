import { getLines } from "../read-input.mjs";

const grid = getLines("./input.txt");

const getLine = (line, start, end) => {
  const clampedStart = Math.max(0, start - 1);
  return grid[line]?.slice(clampedStart, end + 1) ?? "";
};

const isPartNumber = (line, start, end) => {
  let out = getLine(line - 1, start, end);
  out += getLine(line, start, end);
  out += getLine(line + 1, start, end);
  return !!out.match(/[^.\d]/);
};

let sum = 0;

grid.forEach((line, li) => {
  const matches = [...line.matchAll(/\d+/g)];
  matches.forEach((match) => {
    if (isPartNumber(li, match.index, match.index + match[0].length)) {
      sum += +match[0];
    }
  });
});

console.log(sum);
