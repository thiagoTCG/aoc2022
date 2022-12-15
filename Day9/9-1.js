const fs = require("fs");

const inputs = fs.readFileSync("./input.txt", "utf-8").split(/\n/);

const GRID_HEIGHT = 700;
const GRID_WIDTH = 700;

function moveRope() {
  let grid = Array(GRID_HEIGHT)
    .fill(".")
    .map(() => Array(GRID_WIDTH).fill("."));
  let headX = Math.ceil(GRID_WIDTH / 2);
  let headY = Math.ceil(GRID_HEIGHT / 2);
  let tailX = Math.ceil(GRID_WIDTH / 2);
  let tailY = Math.ceil(GRID_HEIGHT / 2);

  grid[headY][headX] = "s";

  inputs.forEach((command) => {
    const [orientation, moves] = command.split(" ");
    const numberOfMoves = Number(moves);

    for (let i = 0; i < numberOfMoves; i++) {
      switch (orientation) {
        case "U":
          headY--;
          break;
        case "D":
          headY++;
          break;
        case "L":
          headX--;
          break;
        case "R":
          headX++;
          break;
      }

      const tailDistance = Math.abs(headX - tailX) + Math.abs(headY - tailY);
      if (tailDistance > 1) {
        if (headY === tailY) {
          if (headX > tailX) {
            tailX++;
          } else {
            tailX--;
          }
        } else if (headX === tailX) {
          if (headY > tailY) {
            tailY++;
          } else {
            tailY--;
          }
        } else {
          if (tailDistance > 2) {
            if (headX > tailX) {
              tailX++;
            } else {
              tailX--;
            }
            if (headY > tailY) {
              tailY++;
            } else {
              tailY--;
            }
          }
        }
      }
      grid[tailY][tailX] = "#";
    }
  });
  return grid.join(",").split(",").join("").replace(/\./gi, "").length;
}

console.log("Visited cells:", moveRope());
