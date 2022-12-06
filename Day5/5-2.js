const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim().split(/\n\n/);
const crates = input[0];
const ordering = input[1].split(/\n/);

function parseCrates(stack) {
  const initialStackState = {};
  const originalStack = stack.split(/\n/).reverse();
  const keys = originalStack.shift().trim().split("   ").map(Number);
  keys.map((key, index) => {
    initialStackState[key] = [];
    originalStack.map((row) => {
      const crate = row[index * 4 + 1].trim();
      if (crate.length) initialStackState[key].push(crate);
    });
  });
  return initialStackState;
}

function arrangeBoxes(instruction) {
  const [howMany, from, to] = instruction.split(" ").filter(Number).map(Number);

  const crates = initialStatus[from].splice(howMany * -1);
  initialStatus[to].push(...crates);
}

const initialStatus = parseCrates(crates);

ordering.forEach((order) => arrangeBoxes(order));

const sequence = Object.values(initialStatus).map(
  (column) => column[column.length - 1]
);
console.log("Sequence", sequence.join(""));
