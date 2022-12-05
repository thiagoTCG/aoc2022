const fs = require("fs");

const charValues = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const textInput = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

let sum = 0;

function calculateBadge(line1, line2, line3) {
  for (let i = 0; i < line1.length; i++) {
    const checked = line1[i];
    if (line2.includes(checked) && line3.includes(checked)) {
      sum = sum + charValues.indexOf(checked);
      break;
    }
  }
}

for (let i = 0; i < textInput.length; i += 3) {
  calculateBadge(textInput[i], textInput[i + 1], textInput[i + 2]);
}

console.log("Sum", sum);
