const fs = require("fs");

const charValues = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const textInput = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

let sum = 0;

function calculatePriorities(line) {
  const compartment1 = line.slice(0, line.length / 2);
  const compartment2 = line.slice(line.length / 2, line.length);
  for (let i = 0; i < compartment1.length; i++) {
    const checked = compartment1[i];
    if (compartment2.indexOf(checked) > -1) {
      sum = sum + charValues.indexOf(checked);
      break;
    }
  }
}

textInput.forEach(calculatePriorities);

console.log("Sum: ", sum);
