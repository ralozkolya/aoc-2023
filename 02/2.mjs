import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt").toString();

let sum = 0;

input
  .trim()
  .split("\n")
  .forEach((line) => {
    const [label, data] = line.split(": ");
    const [, id] = label.split(" ");

    const target = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const round of data.split("; ")) {
      const sets = round.split(", ");
      for (const set of sets) {
        const [number, color] = set.split(" ");

        target[color] = Math.max(number, target[color]);
      }
    }

    sum += Object.values(target).reduce((a, b) => a * b);
  });

console.log(sum);
