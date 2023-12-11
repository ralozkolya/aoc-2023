import { getCharacters } from "../read-input.mjs";
import { fillSequence } from "../util/array.mjs";
import { between } from "../util/math.mjs";

const data = getCharacters("./input.txt");

const rows = new Set(fillSequence(data.length));
const cols = new Set(fillSequence(data[0].length));
const galaxies = [];

data.forEach((row, i) => {
  row.forEach((cell, j) => {
    if ("#" === cell) {
      rows.delete(i);
      cols.delete(j);
      galaxies.push({ i, j });
    }
  });
});

const distance = (a, b, multiplier) => {
  let distance = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);

  [...rows].forEach((row) => {
    if (between(row, a.i, b.i)) {
      distance += multiplier - 1;
    }
  });

  [...cols].forEach((col) => {
    if (between(col, a.j, b.j)) {
      distance += multiplier - 1;
    }
  });

  return distance;
};

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    sum += distance(galaxies[i], galaxies[j], 2);
  }
}

console.log(sum);
