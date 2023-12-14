export const fill = (length, char = 1) => {
  return new Array(length).fill(char);
};

export const fillSequence = (end, start = 0) => {
  return fill(end - start).map((_, i) => i);
};

export const rotate = (matrix) =>
  matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
