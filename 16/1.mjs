import { getCharacters } from "../read-input.mjs";

const data = getCharacters("./input.txt");

const moveBeam = (px, py, dx, dy, queue, visited) => {
  const getKey = (px, py, dx, dy) => `${px}=${py}*${dx}=${dy}`;
  const visit = (px, py, dx, dy) => visited.add(getKey(px, py, dx, dy));
  const hasVisited = (px, py, dx, dy) => visited.has(getKey(px, py, dx, dy));

  if (hasVisited(px, py, dx, dy)) return;

  const cell = data[py]?.[px];

  if (!cell) return;

  visit(px, py, dx, dy);

  if ("|" === cell && dx) {
    return queue.push([px, py - 1, 0, -1], [px, py + 1, 0, 1]);
  }

  if ("-" === cell && dy) {
    return queue.push([px - 1, py, -1, 0], [px + 1, py, 1, 0]);
  }

  if ("/" == cell) {
    [dx, dy] = [-dy, -dx];
  }

  if ("\\" == cell) {
    [dx, dy] = [dy, dx];
  }

  [px, py] = [px + dx, py + dy];

  queue.push([px, py, dx, dy]);
};

const visit = (queue, visited) => {
  let item;
  while ((item = queue.shift())) {
    moveBeam(...item, queue, visited);
  }

  const unique = [...visited].reduce(
    (unique, item) => unique.add(item.split("*")[0]),
    new Set()
  );

  return unique.size;
};

console.log(visit([[0, 0, 1, 0]], new Set()));
