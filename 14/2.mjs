import { getCharacters } from "../read-input.mjs";
import { rotate } from "../util/array.mjs";

let lines = getCharacters("./input.txt");

const moveNorth = () => {
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if ("O" === line[j]) {
        let k = 0;
        while ("." === lines[i - k - 1]?.[j]) k++;
        [lines[i - k][j], line[j]] = [line[j], lines[i - k][j]];

        k = 0;
        while ("." === lines[i - k - 1]?.[j]) k++;
        [lines[i - k][j], line[j]] = [line[j], lines[i - k][j]];
      }
    }
  }
};

const cycle = () => {
  for (let i = 0; i < 4; i++) {
    moveNorth();
    lines = rotate(lines);
  }
};

const getLoad = () => {
  return lines.reduce((sum, line, li) => {
    const score = lines.length - li;

    return (
      sum +
      line.reduce((sum, char) => {
        if ("O" !== char) {
          return sum;
        }

        return sum + score;
      }, 0)
    );
  }, 0);
};

const map = new Set();
const loads = [];
let repeatedLine, repeatedIndex;

for (let i = 0; true; i++) {
  loads.push(getLoad());
  const line = lines.map((_) => _.join("")).join("");

  if (map.has(line)) {
    if (!repeatedLine) {
      repeatedLine = line;
      repeatedIndex = i;
    } else if (line === repeatedLine) {
      const cycle = i - repeatedIndex;
      const offset = 1e9 % cycle;

      console.log(loads[cycle + offset]);
      break;
    }
  }

  map.add(line);

  cycle();
}
