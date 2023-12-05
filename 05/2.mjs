import _ from "lodash";
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
let seedRanges = [];

data.forEach((line) => {
  if (!line) return;

  if (line.startsWith("seeds")) {
    const ranges = line.split(":")[1].trim().split(" ").map(Number);
    return (seedRanges = _.chunk(ranges, 2));
  }

  if (line.match(/\d/)) {
    const numbers = line.split(" ").map(Number);
    return steps[steps.length - 1].push(new Mapper(...numbers));
  }

  steps.push([]);
});

let min = Infinity;

seedRanges.forEach(([start, length]) => {
  for (let i = start; i < start + length; i++) {
    const result = steps.reduce((result, step) => {
      const mapper = step.find((mapper) => mapper.applies(result));
      return mapper ? mapper.map(result) : result;
    }, i);

    min = Math.min(min, result);
  }
});

console.log(min);
