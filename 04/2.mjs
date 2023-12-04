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

const map = {};

for (let i = 0; i < games.length; i++) {
  map[i] = 1;
}

games.forEach(([winning, actual], index) => {
  const intersection = _.intersection(winning, actual);

  for (let i = 0; i < intersection.length; i++) {
    const next = index + i;

    if (next + 1 < games.length) {
      const multiplier = map[index];
      map[next + 1] += multiplier;
    }
  }
});

console.log(Object.values(map).reduce((a, b) => a + b));
