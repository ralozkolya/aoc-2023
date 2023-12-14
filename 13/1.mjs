import _ from "lodash";
import { getCharacters } from "../read-input.mjs";
import { rotate } from "../util/array.mjs";

const data = getCharacters("./test-input.txt").reduce(
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

const isMirrored = (pattern) => {
  outer: for (let i = 1; i < pattern.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const upper = i + i - j - 1;
      if (pattern.length <= upper) break;
      if (!_.isEqual(pattern[upper], pattern[j])) continue outer;
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
