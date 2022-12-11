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

const FREE_SPACE_NEEDED = 30000000;
const FILE_SYSTEM = 70000000;

function calculateDirToBeDeleted(sizes) {
  let dirToDelete;
  const totalUsed = sizes["/"];
  Object.values(sizes).forEach((size) => {
    const freeSpace = FILE_SYSTEM - (totalUsed - size);
    if (freeSpace > FREE_SPACE_NEEDED) {
      if (!dirToDelete || size < dirToDelete) {
        dirToDelete = size;
      }
    }
  });
  return dirToDelete;
}

console.log("DirToDelete", calculateDirToBeDeleted(dirSizes));
