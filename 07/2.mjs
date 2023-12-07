import { getLines } from "../read-input.mjs";

const data = getLines("./input.txt");

const types = {
  5: 7,
  "4-1": 6,
  "3-2": 5,
  "3-1": 4,
  "2-2": 3,
  "2-1": 2,
  "1-1": 1,
};

const values = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
};

const handToScore = (hand) => {
  const map = {};
  let js = 0;
  hand.split("").forEach((char) => {
    if ("J" === char) {
      return js++;
    }
    map[char] ? map[char]++ : (map[char] = 1);
  });

  const values = Object.values(map).sort((a, b) => b - a);

  if (3 < js) return types[5];
  if (3 === js) return 2 === values[0] ? types[5] : types["4-1"];
  if (2 === js) {
    if (3 === values[0]) return types[5];
    if (2 === values[0]) return types["4-1"];
    return types["3-1"];
  }
  if (js) {
    if (4 === values[0]) return types[5];
    if (3 === values[0]) return types["4-1"];
    if (2 === values[0]) return 2 === values[1] ? types["3-2"] : types["3-1"];
    return types["2-1"];
  }
  return types[values.slice(0, 2).join("-")];
};

const compareSameType = (handA, handB) => {
  for (let i = 0; i < handA.length; i++) {
    const [a, b] = [handA[i], handB[i]];
    if (a !== b) return (values[a] ?? Number(a)) - (values[b] ?? Number(b));
  }
  return 0;
};

const compareHands = (handA, handB) => {
  const scoreA = handToScore(handA);
  const scoreB = handToScore(handB);

  if (scoreA === scoreB) {
    return compareSameType(handA, handB);
  }

  return scoreA - scoreB;
};

data.sort((a, b) => {
  const [handA] = a.split(" ");
  const [handB] = b.split(" ");

  return compareHands(handA, handB);
});

const result = data.reduce((sum, item, index) => {
  const [, bid] = item.split(" ");
  return sum + Number(bid) * (index + 1);
}, 0);

console.log(result);
