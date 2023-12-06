import { getLines } from "../read-input.mjs";

const [time, distance] = getLines("./input.txt").map((line) =>
  Number(line.match(/\d+/g).join(""))
);

const getCount = (time, distance) => {
  let count = 0;
  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) count++;
  }
  return count;
};

console.log(getCount(time, distance));
