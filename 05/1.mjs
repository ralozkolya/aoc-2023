import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt");

class Mapper {
  constructor(destination, source, length) {
    Object.assign(this, { destination, source, length });
  }

  applies(number) {
    return number >= this.source && number < this.source + this.length;
  }

  map(number) {
    const { source, destination } = this;
    if (!this.applies(number)) return number;
    return destination + number - source;
  }
}

const steps = [];
let seeds;

data.forEach((line) => {
  if (!line) return;

  if (line.startsWith("seeds")) {
    return (seeds = line.split(":")[1].trim().split(" ").map(Number));
  }

  if (line.match(/\d/)) {
    const numbers = line.split(" ").map(Number);
    return steps[steps.length - 1].push(new Mapper(...numbers));
  }

  steps.push([]);
});

const result = seeds.map((seed) => {
  return steps.reduce((result, step) => {
    const mapper = step.find((mapper) => mapper.applies(result));
    return mapper ? mapper.map(result) : result;
  }, seed);
});

console.log(Math.min(...result));
