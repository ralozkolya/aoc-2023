import { getLines } from "../read-input.mjs";

const [header, ...body] = getLines("./input.txt").filter((_) => _);

const map = body.reduce((map, line) => {
  const [label, nodes] = line.split(" = ");
  map[label] = nodes.substring(1, 9).split(", ");
  return map;
}, {});

const getSteps = (start) => {
  let count = 0;

  while (start !== "ZZZ") {
    const index = +!(header[count++ % header.length] !== "R");
    start = map[start][index];
  }
  return count;
};

console.log(getSteps("AAA"));
