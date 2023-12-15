import { getLine } from "../read-input.mjs";

const { line } = getLine("./input.txt");

const getHash = (str) => {
  return str
    .split("")
    .reduce((sum, char) => ((sum + char.charCodeAt(0)) * 17) % 256, 0);
};

const boxes = new Array(256).fill(1).map((_) => []);

line.split(",").forEach((line) => {
  const [label, focal] = line.split(/-|=/);

  const hash = getHash(label);

  if (!focal) {
    return boxes[hash].some((item, i) => {
      if (label !== item.label) return false;
      boxes[hash].splice(i, 1);
      return true;
    });
  }

  if (
    !boxes[hash].some((item, i) => {
      if (label !== item.label) return false;
      boxes[hash][i] = { label, focal };
      return true;
    })
  ) {
    boxes[hash].push({ label, focal });
  }
});

const sum = boxes.reduce((sum, box, i) => {
  const boxScore = box.reduce((sum, lens, j) => {
    return sum + (i + 1) * (j + 1) * +lens.focal;
  }, 0);

  return sum + boxScore;
}, 0);

console.log(sum);
