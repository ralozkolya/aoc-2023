import { getLines } from "../read-input.mjs";
import { shoelace } from "../util/math.mjs";

const data = getLines("./input.txt");

const directions = {
  2: { x: -1, y: 0 },
  0: { x: 1, y: 0 },
  3: { x: 0, y: -1 },
  1: { x: 0, y: 1 },
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
  const [, , instruction] = line.split(" ");

  const len = parseInt(instruction.substring(2, 7), 16);
  const dir = instruction.substring(7, 8);

  perimeter += +len;

  ({ x, y } = addDirirection(dir, len, { x, y }));

  points.push({ x, y });
});

console.log(shoelace(points) + 1 - perimeter / 2 + perimeter);
