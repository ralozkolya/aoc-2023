import { getLines } from "../read-input.mjs";

const grid = getLines("./input.txt");

const isPartNumber = (grid, line, start, end) => {
  let out = "";
  const clampedStart = Math.max(0, start - 1);
  out += grid[line - 1]?.slice(clampedStart, end + 1) ?? "";
  out += grid[line + 1]?.slice(clampedStart, end + 1) ?? "";
  out += grid[line][end] ?? "";
  out += grid[line][start - 1] ?? "";
  return !!out.match(/[^\.]/);
};

let sum = 0;

grid.forEach((line, li) => {
  const matches = [...line.matchAll(/\d+/g)];
  matches.forEach((match) => {
    if (isPartNumber(grid, li, match.index, match.index + match[0].length)) {
      sum += +match[0];
    }
  });
});

console.log(sum);
