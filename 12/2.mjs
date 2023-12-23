import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt").map((_) => {
  const [symbols, numbers] = _.split(" ");
  return [
    new Array(5).fill(symbols).join("?"),
    new Array(5).fill(numbers).join(",").split(",").map(Number),
  ];
});

const numbersToPattern = (numbers) => {
  const pattern = numbers.map((number) => "#".repeat(number)).join(".");
  return `.${pattern}.`;
};

const incrementKey = (data, index, value) => {
  data[index] ??= 0;
  data[index] += value;
};

const calculateCombinations = (symbols, numbers) => {
  const pattern = numbersToPattern(numbers);
  let prevData = { 0: 1 };

  for (const char of symbols) {
    const data = {};

    for (const key of Object.keys(prevData)) {
      const index = +key;
      const nextIndex = index + 1;
      const symbol = pattern[index];
      const nextSymbol = pattern[nextIndex];
      const prev = prevData[index];

      if ("." === char) {
        if ("." === symbol) {
          incrementKey(data, index, prev);
        }

        if ("." === nextSymbol) {
          incrementKey(data, nextIndex, prev);
        }

        continue;
      }

      if (char == "#") {
        if (nextSymbol == "#") {
          incrementKey(data, nextIndex, prev);
        }

        continue;
      }

      if (char == "?") {
        if (symbol == ".") {
          incrementKey(data, index, prev);
        }

        if (nextIndex < pattern.length) {
          incrementKey(data, nextIndex, prev);
        }
      }
    }

    prevData = data;
  }

  return (
    (prevData[pattern.length - 1] ?? 0) + (prevData[pattern.length - 2] ?? 0)
  );
};

const result = data.reduce((sum, row) => {
  return sum + calculateCombinations(...row);
}, 0);

console.log(result);
