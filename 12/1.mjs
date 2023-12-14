import { getLines } from "../read-input.mjs";
import { repeat } from "../util/string.mjs";

const data = getLines("./input.txt").map((_) => {
  const [symbols, numbers] = _.split(" ");
  return [symbols, numbers.split(",").map(Number)];
});

const isValid = (symbols, numbers) => {
  return symbols.match(/#+/g).every((match, i) => match.length === numbers[i]);
};

const mix = (source, combination) => {
  const combArray = combination.split("");
  return source.replace(/\?/g, () => combArray.shift());
};

const getCombinations = (n, m, prefix = "", result = []) => {
  if (n <= m) return [prefix + repeat("#", n)];
  if (m <= 0) return [prefix + repeat(".", n)];

  return [
    ...result,
    ...getCombinations(n - 1, m - 1, prefix + "#"),
    ...getCombinations(n - 1, m, prefix + "."),
  ];
};

const sum = data.reduce((sum, [symbols, numbers]) => {
  const total = numbers.reduce((a, b) => a + b);
  const unknown = symbols.match(/\?/g).length;
  const known = symbols.match(/#/g)?.length ?? 0;

  return (sum += getCombinations(unknown, total - known).filter((combination) =>
    isValid(mix(symbols, combination), numbers)
  ).length);
}, 0);

console.log(sum);
