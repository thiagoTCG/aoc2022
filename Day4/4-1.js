const fs = require("fs");

const pairs = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

let sum = 0;

function calculateOverlap(line) {
  const [range1, range2] = line.split(",");
  const [range1Min, range1Max] = range1.split("-");
  const [range2Min, range2Max] = range2.split("-");
  if (
    (Number(range1Min) >= Number(range2Min) &&
      Number(range1Max) <= Number(range2Max)) ||
    (Number(range2Min) >= Number(range1Min) &&
      Number(range2Max) <= Number(range1Max))
  ) {
    sum += 1;
  }
  return;
}

pairs.forEach(calculateOverlap);

console.log("Sum", sum);
