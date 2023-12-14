import { getCharacters } from "../read-input.mjs";

const lines = getCharacters("./input.txt");

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if ("O" === line[j]) {
      let k = 0;
      while ("." === lines[i - k - 1]?.[j]) k++;
      [lines[i - k][j], line[j]] = [line[j], lines[i - k][j]];
    }
  }
}

const sum = lines.reduce((sum, line, li) => {
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

console.log(sum);
