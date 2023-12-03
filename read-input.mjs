import { readFileSync } from "node:fs";

export const getLines = (filename) => {
  const input = readFileSync(filename).toString();
  return input.trim().split("\n");
};

export const getCharacters = (filename) => {
  return getLines(filename).map((line) => line.split(""));
};

export const getLine = (filename) => {
  const lines = getLines(filename);
  return {
    width: lines[0].length,
    height: lines.length,
    line: lines.join(""),
  };
};
