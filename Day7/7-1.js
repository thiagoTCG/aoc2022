const fs = require("fs");

const inputs = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

const dirSizes = {};

function createSizeMap(commands) {
  const currentDir = [];
  commands.forEach((line) => {
    if (line.startsWith("$ cd")) {
      const [$, comm, dir] = line.split(" ");
      if (dir === "..") {
        currentDir.pop();
      } else {
        currentDir.push(dir);
      }
    } else {
      const [size, name] = line.split(" ");
      if (isNaN(size)) return;
      currentDir.forEach((path, ind, arr) => {
        const pathToAdd = arr.slice(0, ind + 1).join("/");
        dirSizes[pathToAdd] = (dirSizes[pathToAdd] || 0) + Number(size);
      });
    }
  });
}

createSizeMap(inputs);

function sumSmallDirs(sizeMap) {
  return Object.values(sizeMap)
    .filter((size) => size <= 100000)
    .reduce((acc, val) => acc + val, 0);
}

console.log("sum", sumSmallDirs(dirSizes));
