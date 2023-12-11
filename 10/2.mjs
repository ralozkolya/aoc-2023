import { getLine } from "../read-input.mjs";

const { width, line } = getLine("./input.txt");

const getStartingPoints = (index) => {
  // Needs more checks, but works on given input
  const top = ["|", "F", "7"].includes(line[index - width]) && index - width;
  const bot = ["|", "J", "L"].includes(line[index + width]) && index + width;
  const left = ["-", "F", "L"].includes(line[index - 1]) && index - 1;
  const right = ["-", "J", "7"].includes(line[index + 1]) && index + 1;

  return [top, bot, left, right].find((_) => _);
};

const getNext = (current, previous) => {
  switch (line[current]) {
    case "|":
      return current > previous ? current + width : current - width;
    case "-":
      return current > previous ? current + 1 : current - 1;
    case "L":
      return current > previous ? current + 1 : current - width;
    case "7":
      return current > previous ? current + width : current - 1;
    case "J":
      return current - previous > 1 ? current - 1 : current - width;
    case "F":
      return previous - current > 1 ? current + 1 : current + width;
  }
};

const getCoordinates = (number) => {
  return {
    x: number % width,
    y: Math.floor(number / width),
  };
};

const shoelace = (points) => {
  let sum = 0;
  const l = points.length;

  for (let i = 0; i < l - 1; i++) {
    const a = getCoordinates(points[i]);
    const b = getCoordinates(points[i + 1]);
    sum += a.x * b.y - a.y * b.x;
  }

  const a = getCoordinates(points[l - 1]);
  const b = getCoordinates(points[0]);
  sum += a.x * b.y - b.x * a.y;

  return Math.abs(sum) / 2;
};

const index = line.indexOf("S");
let current = getStartingPoints(index);
let previous = index;

const loop = [index];
while (current !== index) {
  loop.push(current);
  const temp = current;
  current = getNext(current, previous);
  previous = temp;
}

console.log(shoelace(loop) + 1 - loop.length / 2);
