export const repeat = (string, repeat) => {
  let result = "";
  for (let i = 0; i < repeat; i++) {
    result += string;
  }
  return result;
};
