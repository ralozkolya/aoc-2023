import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt").reduce(
  (arr, line) => {
    if (!line) arr.push([]);
    else arr[arr.length - 1].push(line);
    return arr;
  },
  [[]]
);

const operations = {
  ">": (a, b) => a > b,
  "<": (a, b) => a < b,
};

const workflows = data[0].reduce((acc, workflow) => {
  const [name, payload] = workflow.slice(0, -1).split("{");
  acc[name] = payload.split(",").map((step) => {
    const [destination, condition] = step.split(":").reverse();
    let compare = () => true;

    if (condition) {
      const name = condition[0];
      const operator = condition[1];
      const value = +condition.substring(2);
      compare = (part) => operations[operator](part[name], value);
    }

    return { destination, compare };
  });
  return acc;
}, {});

const result = data[1]
  .map((part) =>
    part
      .slice(1, -1)
      .split(",")
      .reduce((acc, part) => {
        const [name, value] = part.split("=");
        acc[name] = +value;
        return acc;
      }, {})
  )
  .filter((part) => {
    let workflow = workflows["in"];

    for (let i = 0; i < workflow.length; i++) {
      const { destination, compare } = workflow[i];
      if (!compare(part)) continue;
      if (destination.match(/A|R/)) return "A" === destination;
      workflow = workflows[destination];
      i = -1;
    }
  })
  .map((part) => part.x + part.m + part.a + part.s)
  .reduce((a, b) => a + b);

console.log(result);
