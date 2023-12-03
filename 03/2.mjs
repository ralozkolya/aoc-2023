import { getLines } from "../read-input.mjs";

const grid = getLines("./input.txt");

const map = {};

const getLine = (line) => (line ?? "").split("");

const recordGear = (grid, number, x, y) => {
  if ("*" !== grid[y][x]) {
    return;
  }

  const key = `${x}-${y}`;

  if (!map[key]) {
    map[key] = [];
  }

  map[key].push(number);
};

const getGears = (grid, line, start, number) => {
  const end = start + number.length;
  const clampedStart = Math.max(0, start - 1);

  getLine(grid[line - 1]?.slice(clampedStart, end + 1)).forEach((char, i) =>
    recordGear(grid, number, clampedStart + i, line - 1)
  );

  getLine(grid[line + 1]?.slice(clampedStart, end + 1)).forEach((char, i) =>
    recordGear(grid, number, clampedStart + i, line + 1)
  );

  recordGear(grid, number, end, line);
  recordGear(grid, number, start - 1, line);
};

grid.forEach((line, li) => {
  const matches = [...line.matchAll(/\d+/g)];
  matches.forEach((match) => {
    getGears(grid, li, match.index, match[0]);
  });
});

const result = Object.values(map)
  .filter((numbers) => 2 === numbers.length)
  .map((gears) => gears.reduce((a, b) => a * b))
  .reduce((a, b) => a + b);

console.log(result);
