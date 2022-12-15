const fs = require("fs");

const inputs = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

const GRID_HEIGHT = 1000;
const GRID_WIDTH = 1000;

function moveRope() {
  let grid = Array(GRID_HEIGHT)
    .fill()
    .map(() => Array(GRID_WIDTH).fill("."));
  let initialX = Math.ceil(GRID_WIDTH / 2);
  let initialY = Math.ceil(GRID_HEIGHT / 2);
  const ropeLength = 10;
  let ropePositions = Array(ropeLength)
    .fill()
    .map(() => ({
      x: initialX,
      y: initialY,
    }));

  inputs.forEach((command) => {
    const [orientation, moves] = command.split(" ");
    const numberOfMoves = Number(moves);

    for (let i = 0; i < numberOfMoves; i++) {
      switch (orientation) {
        case "U":
          ropePositions[0].y--;
          break;
        case "D":
          ropePositions[0].y++;
          break;
        case "L":
          ropePositions[0].x--;
          break;
        case "R":
          ropePositions[0].x++;
          break;
      }

      for (let ropeSegment = 1; ropeSegment < ropeLength; ropeSegment++) {
        const prevSegment = ropePositions[ropeSegment - 1];
        const currSegment = ropePositions[ropeSegment];
        const distanceToPrevious =
          Math.abs(prevSegment.x - currSegment.x) +
          Math.abs(prevSegment.y - currSegment.y);
        if (distanceToPrevious > 1) {
          if (prevSegment.y === currSegment.y) {
            if (prevSegment.x > currSegment.x) {
              ropePositions[ropeSegment].x++;
            } else {
              ropePositions[ropeSegment].x--;
            }
          } else if (prevSegment.x === currSegment.x) {
            if (prevSegment.y > currSegment.y) {
              ropePositions[ropeSegment].y++;
            } else {
              ropePositions[ropeSegment].y--;
            }
          } else {
            if (distanceToPrevious > 2) {
              if (prevSegment.x > currSegment.x) {
                ropePositions[ropeSegment].x++;
              } else {
                ropePositions[ropeSegment].x--;
              }
              if (prevSegment.y > currSegment.y) {
                ropePositions[ropeSegment].y++;
              } else {
                ropePositions[ropeSegment].y--;
              }
            }
          }
        }
        if (ropeSegment === ropeLength - 1) {
          grid[ropePositions[ropeSegment].y][ropePositions[ropeSegment].x] =
            "#";
        }
      }
    }
  });
  return grid.join(",").split(",").join("").replace(/\./gi, "").length;
}

console.log("Visited cells:", moveRope());
