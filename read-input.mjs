import { readFileSync } from "node:fs";

export const getLines = (filename) => {
  const input = readFileSync(filename).toString();
  return input.trim().split("\n");
};

export const getCharacters = (filename) => {
  return getLines(filename).map((line) => line.split(""));
};
