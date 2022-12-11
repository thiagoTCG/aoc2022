const fs = require("fs");

const grid = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

function createMap(input) {
  return input.map((line) => line.split("").map(Number));
}

const forrestMap = createMap(grid);

const mapWidth = forrestMap[0].length;
const mapHeight = forrestMap.length;
// const totalTrees = mapWidth * mapHeight;

let visibleTrees = 0;

function verticallyVisible(treeMap, x, y) {
  if (y === 0 || y === mapHeight) return true;
  const tree = treeMap[y][x];
  const column = treeMap.map((row) => row[x]);
  const topToBottom = column.slice(0, y);
  const bottomToTop = column.slice(y + 1, mapHeight);
  return (
    topToBottom.every((elem) => elem < tree) ||
    bottomToTop.every((elem) => elem < tree)
  );
}

function horizontallyVisible(treeMap, x, y) {
  if (x === 0 || x === mapWidth) return true;
  const tree = treeMap[y][x];
  const leftToRight = treeMap[y].slice(0, x);
  const rightToLeft = treeMap[y].slice(x + 1, mapWidth);
  return (
    leftToRight.every((elem) => elem < tree) ||
    rightToLeft.every((elem) => elem < tree)
  );
}

function calculateTreeVisibility(treeMap) {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      if (
        verticallyVisible(treeMap, x, y) ||
        horizontallyVisible(treeMap, x, y)
      ) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
}

console.log("total", calculateTreeVisibility(forrestMap));
