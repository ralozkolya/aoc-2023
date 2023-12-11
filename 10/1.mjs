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

const index = line.indexOf("S");
let current = getStartingPoints(index);
let previous = index;

let count = 1;
while (current !== index) {
  const temp = current;
  current = getNext(current, previous);
  previous = temp;
  count++;
}

console.log(count / 2);
