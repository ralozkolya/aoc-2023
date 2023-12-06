import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt").map((line) =>
  line.match(/\d+/g).map(Number)
);

const getCount = (time, distance) => {
  let count = 0;
  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) count++;
  }
  return count;
};

const result = data[0].reduce((sum, time, index) => {
  const distance = data[1][index];
  return sum * getCount(time, distance); // Assuming count is never zero
}, 1);

console.log(result);
