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
    if ("J" === char) return js++;
    map[char] ? map[char]++ : (map[char] = 1);
  });
  const values = Object.values(map).sort((a, b) => b - a);
  if (!values.length) return types["5"];
  values[0] = values[0] + js;
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
  return scoreA === scoreB ? compareSameType(handA, handB) : scoreA - scoreB;
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
