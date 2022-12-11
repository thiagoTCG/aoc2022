const fs = require("fs");

const grid = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

function createMap(input) {
  return input.map((line) => line.split("").map(Number));
}

const forrestMap = createMap(grid);

const mapWidth = forrestMap[0].length;
const mapHeight = forrestMap.length;
let highestScenicScore = 0;

function calculateScenicScore(treeMap, x, y) {
  if (x === 0 || y === 0 || x === mapWidth || y === mapHeight) return;
  const tree = treeMap[y][x];
  const row = treeMap[y];
  const column = treeMap.map((row) => row[x]);
  const topColumn = column.slice(0, y).reverse();
  const viewedTreesTop = topColumn.findIndex((elem) => elem >= tree);
  const bottomColumn = column.slice(y + 1, mapHeight);
  const viewedTreesBottom = bottomColumn.findIndex((elem) => elem >= tree);
  const leftRow = row.slice(0, x).reverse();
  const viewedTreesLeft = leftRow.findIndex((elem) => elem >= tree);
  const rightRow = row.slice(x + 1, mapWidth);
  const viewedTreesRight = rightRow.findIndex((elem) => elem >= tree);
  const topScore = viewedTreesTop > -1 ? viewedTreesTop + 1 : topColumn.length;
  const bottomScore =
    viewedTreesBottom > -1 ? viewedTreesBottom + 1 : bottomColumn.length;
  const leftScore = viewedTreesLeft > -1 ? viewedTreesLeft + 1 : leftRow.length;
  const rightScore =
    viewedTreesRight > -1 ? viewedTreesRight + 1 : rightRow.length;

  return topScore * bottomScore * leftScore * rightScore;
}

function calculateTreeVisibility(treeMap) {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const treeResult = calculateScenicScore(treeMap, x, y);
      if (treeResult > highestScenicScore) {
        highestScenicScore = treeResult;
      }
    }
  }
  return highestScenicScore;
}

console.log("HighestScenicScore", calculateTreeVisibility(forrestMap));
