import { getCharacters, getLine } from "../read-input.mjs";

const filename = "./input.txt";
const { line, width } = getLine(filename);
const data = getCharacters(filename);

const directions = {
  "|": { x: 0, y: 0 },
  "-": { x: 0, y: 0 },
  L: { x: 1, y: -1 },
  J: { x: -1, y: -1 },
  F: { x: 1, y: 1 },
  7: { x: -1, y: 1 },
};

const getNextDirection = (previous, current) => {
  return {
    x: previous.x + current.x,
    y: previous.y + current.y,
  };
};

const move = (x, y, direction) => {
  const [origX, origY] = [x, y];
  const loop = [];
  do {
    direction = getNextDirection(
      direction,
      directions[data[y]?.[x]] ?? directions["-"]
    );
    x += direction.x;
    y += direction.y;
    loop.push({ x, y });
  } while (origX !== x || origY !== y);
  return loop;
};

const shoelace = (points) => {
  let sum = 0;
  const l = points.length;

  for (let i = 0; i < l - 1; i++) {
    sum += points[i].x * points[i + 1].y - points[i].y * points[i + 1].x;
  }

  sum += points[l - 1].x * points[0].y - points[0].x * points[l - 1].y;

  return Math.abs(sum) / 2;
};

const start = line.indexOf("S");
const startX = start % width;
const startY = Math.floor(start / width);

const loop = move(startX, startY, { x: 1, y: 0 });

console.log(shoelace(loop) + 1 - loop.length / 2);
