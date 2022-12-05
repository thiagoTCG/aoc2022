const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").trim().split(/\n/);

const calculate = (arr) => {
  let largest = 0;
  let sum = 0;
  arr.forEach((val) => {
    if (Boolean(val)) {
      sum = sum + Number(val);
    } else {
      if (sum > largest) {
        largest = sum;
      }
      sum = 0;
    }
  });
  return largest;
};

console.log(calculate(input));
