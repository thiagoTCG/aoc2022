const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim().split(/\n\n/);
const crates = input[0];
const ordering = input[1].split(/\n/);

function parseCrates(stack) {
  const initialStackState = {};
  const originalStackState = stack.split(/\n/).reverse();
  const stackNumbers = originalStackState
    .shift()
    .trim()
    .split("   ")
    .map(Number);
  stackNumbers.map((stackNumber, index) => {
    initialStackState[stackNumber] = [];
    originalStackState.map((row) => {
      const crate = row[index * 4 + 1].trim();
      if (crate.length) initialStackState[stackNumber].push(crate);
    });
  });
  return initialStackState;
}

function arrangeBoxes(instruction) {
  const [howMany, from, to] = instruction.split(" ").filter(Number).map(Number);
  for (let i = 0; i < howMany; i++) {
    const crate = initialStatus[from].pop();
    initialStatus[to].push(crate);
  }
}

const initialStatus = parseCrates(crates);
ordering.forEach((order) => arrangeBoxes(order));

const sequence = Object.values(initialStatus).map(
  (column) => column[column.length - 1]
);
console.log("Sequence", sequence.join(""));
