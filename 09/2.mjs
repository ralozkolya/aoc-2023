import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt").map((line) => line.split(" ").map(Number));

const getSequences = (history) => {
  const sequence = [];
  history[0].reduce((a, b) => (sequence.push(b - a), b));
  if (sequence.find((_) => _)) {
    return getSequences([sequence, ...history]);
  }
  return history;
};

const getNextValue = (sequences) => {
  return sequences.map((sequence) => sequence[0]).reduce((a, b) => b - a);
};

const result = data
  .map((sequence) => getNextValue(getSequences([sequence])))
  .reduce((a, b) => a + b);

console.log(result);
