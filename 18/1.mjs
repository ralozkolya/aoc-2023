import { getLines } from "../read-input.mjs";
import { shoelace } from "../util/math.mjs";

const data = getLines("./input.txt");

const directions = {
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
};

let x = 0;
let y = 0;

const points = [{ x, y }];

const addDirirection = (direction, length, point) => {
  return {
    x: point.x + directions[direction].x * length,
    y: point.y + directions[direction].y * length,
  };
};

let perimeter = 0;
data.forEach((line) => {
  const [dir, len] = line.split(" ");

  perimeter += +len;

  ({ x, y } = addDirirection(dir, len, { x, y }));

  points.push({ x, y });
});

console.log(shoelace(points) + 1 - perimeter / 2 + perimeter);
