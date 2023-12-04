import { getLines } from "../read-input.mjs";
import _ from "lodash";

const lines = getLines("./input.txt");

const games = lines.map((line) =>
  line
    .split(":")[1]
    .split("|")
    .map((part) =>
      part
        .trim()
        .split(" ")
        .filter((a) => a)
    )
);

let sum = 0;

games.forEach(([winning, actual]) => {
  const intersection = _.intersection(winning, actual);

  if (!intersection.length) {
    return;
  }

  sum += 2 ** (intersection.length - 1);
});

console.log(sum);
