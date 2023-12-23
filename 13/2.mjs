import { getCharacters } from "../read-input.mjs";
import { rotate } from "../util/array.mjs";

const data = getCharacters("./input.txt").reduce(
  (pattern, row) => {
    if (!row.length) {
      pattern.push([]);
    } else {
      pattern[pattern.length - 1].push(row);
    }
    return pattern;
  },
  [[]]
);

const compare = (a, b) => {
  let differences = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences++;
    }

    if (differences > 1) {
      return differences;
    }
  }

  return differences;
};

const isMirrored = (pattern) => {
  outer: for (let i = 1; i < pattern.length; i++) {
    let differences = 0;
    for (let j = i - 1; j >= 0; j--) {
      const upper = i + i - j - 1;
      if (pattern.length <= upper) break;

      const lineDiff = compare(pattern[upper], pattern[j]);

      if (lineDiff > 1) {
        continue outer;
      } else if (lineDiff) {
        differences++;
      }
    }

    if (differences !== 1) {
      continue outer;
    }
    return i;
  }
  return 0;
};

let sum = 0;

data.forEach((pattern) => {
  const horizontal = isMirrored(pattern);

  if (horizontal) return (sum += horizontal * 100);

  const rotated = rotate(pattern);
  sum += isMirrored(rotated);
});

console.log(sum);
