const fs = require("fs");

const ordering = fs.readFileSync("input.txt", "utf-8").trim().split(/\n/);

const initialStatus = {
  1: ["B", "L", "D", "T", "W", "C", "F", "M"],
  2: ["N", "B", "L"],
  3: ["J", "C", "H", "T", "L", "V"],
  4: ["S", "P", "J", "W"],
  5: ["Z", "S", "C", "F", "T", "L", "R"],
  6: ["W", "D", "G", "B", "H", "N", "Z"],
  7: ["F", "M", "S", "P", "V", "G", "C", "N"],
  8: ["W", "Q", "R", "J", "F", "V", "C", "Z"],
  9: ["R", "P", "M", "L", "H"],
};

function arrangeBoxes(instruction) {
  const [howMany, from, to] = instruction.split(" ").filter(Number).map(Number);

  const crates = initialStatus[from].splice(howMany * -1);
  initialStatus[to].push(...crates);
}

ordering.forEach((order) => arrangeBoxes(order));

const sequence = Object.values(initialStatus).map(
  (column) => column[column.length - 1]
);
console.log("Sequence", sequence.join(""));
