import { readFileSync } from "node:fs";

const input = readFileSync("./input.txt").toString();

let sum = 0;

input
  .trim()
  .split("\n")
  .forEach((line) => {
    const [label, data] = line.split(": ");
    const [, id] = label.split(" ");

    for (const round of data.split("; ")) {
      const target = {
        red: 12,
        green: 13,
        blue: 14,
      };

      const sets = round.split(", ");
      for (const set of sets) {
        const [number, color] = set.split(" ");

        if (target[color] < number) {
          return;
        }
      }
    }

    sum += +id;
  });

console.log(sum);
