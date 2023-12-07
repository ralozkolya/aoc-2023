import { getLines } from "../read-input.mjs";

const data = getLines("./test-input.txt");

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
  hand.split("").forEach((char) => {
    map[char] ? map[char]++ : (map[char] = 1);
  });
  const values = Object.values(map).sort((a, b) => b - a);
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
