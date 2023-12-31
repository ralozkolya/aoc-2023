const getPrimeFactors = (num) => {
  const factors = [];
  let divisor = 2;

  while (num >= 2) {
    if (num % divisor == 0) {
      factors.push(divisor);
      num = num / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
};

const countOccurences = (nums) => {
  return nums.reduce((map, number) => {
    map[number] ? map[number]++ : (map[number] = 1);
    return map;
  }, {});
};

const keepHighest = (map, occurences) => {
  return Object.keys(occurences).reduce((map, number) => {
    map[number] = Math.max(map[number] ?? 0, occurences[number]);
    return map;
  }, map);
};

export const leastCommonMultiple = (nums) => {
  const factors = nums.map((num) => getPrimeFactors(num));

  const counts = factors.reduce((map, factor) => {
    return keepHighest(map, countOccurences(factor));
  }, {});

  return Object.entries(counts).reduce(
    (sum, entry) => entry[0] ** entry[1] * sum,
    1
  );
};

export const between = (subject, a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return min < subject && subject < max;
};

export const factorial = (n) => {
  let sum = n;
  while (--n) {
    sum *= n;
  }
  return sum;
};

export const shoelace = (points) => {
  const l = points.length;
  let sum = 0;

  for (let i = 0; i < l - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    sum += a.x * b.y - a.y * b.x;
  }

  const a = points[l - 1];
  const b = points[0];
  sum += a.x * b.y - b.x * a.y;

  return Math.abs(sum) / 2;
};
